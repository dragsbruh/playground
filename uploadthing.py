import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

UPLOADTHING_TOKEN = os.getenv('UPLOADTHING_TOKEN')
if not UPLOADTHING_TOKEN:
    raise ValueError("UPLOADTHING_TOKEN is not set in environment variables.")

BASE_URL = 'https://api.uploadthing.com/v6'

HEADERS = {
    'x-uploadthing-api-key': UPLOADTHING_TOKEN,
    'content-type': 'application/json'
}


response = requests.post(f'{BASE_URL}/listFiles', headers=HEADERS, json={})
if response.status_code != 200:
    raise Exception(
        f"Error fetching files: {response.status_code} {response.text}")
files = response.json()["files"]

uploads = {}
for file in files:
    if file["name"].split(".")[1] in ["m4a", "flac", "mp3", "ogg", "wav"]:
        uploads[file["name"]] = "https://utfs.io/f/" + file["key"]

with open("src/lib/uploads.json", "w") as f:
    json.dump(uploads, f, indent=2)

for fileName in uploads.keys():
    if os.path.exists("static/dev/"+fileName):
        continue
    print("downloading", fileName)
    url = uploads[fileName]
    response = requests.get(url)
    with open("static/dev/"+fileName, "wb") as f:
        f.write(response.content)