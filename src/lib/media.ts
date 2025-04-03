import { dev } from "$app/environment";
import uploads from "./uploads.json";

const remoteSources: { [key: string]: string } = uploads;

export type Audio = {
  name: string;
  cover: string;
  source: string;
  attribution: string;
};

export const audios: Audio[] = [
  {
    name: "Stay with me",
    cover: "staywithme.jpg",
    source: "staywithme.mp3",
    attribution:
      "https://open.spotify.com/track/2BHj31ufdEqVK5CkYDp9mA?si=de94d9b3811e4084",
  },
  {
    name: "Dark Aria",
    cover: "darkaria.jpg",
    source: "darkaria.mp3",
    attribution:
      "https://www.youtube.com/watch?v=ZGXOWPZ64DA",
  },
  {
    name: "Lifeline (Reborn)",
    cover: "lifeline.jpg",
    source: "lifeline.mp3",
    attribution:
      "https://www.youtube.com/watch?v=VFfhmsAXV-8",
  },
  {
    name: "Sweet Dreams",
    cover: "sweetdreams.jpg",
    source: "sweetdreams.mp3",
    attribution:
      "https://open.spotify.com/track/1SiTJWmO416vuOw3nUl1jw?si=976c098e18824c58",
  },
  {
    name: "The Rumbling",
    cover: "rumbling.jpg",
    source: "rumbling.mp3",
    attribution: "https://www.youtube.com/watch?v=OBqw818mQ1E",
  },
  {
    name: "Akari",
    cover: "akari.jpg",
    source: "akari.mp3",
    attribution: "https://www.youtube.com/watch?v=4jWzGkRsHw8",
  },
  {
    name: "The World",
    cover: "theworld.jpg",
    source: "theworld.mp3",
    attribution: "https://open.spotify.com/track/5W53797BOyrbASWrZq24lp?si=4334c72b05a24493",
  }
];

if (!dev) {
  audios.forEach((aud) => {
    if (!(aud.source in remoteSources)) {
      throw new Error(`remote source missing for audio ${aud.name}`);
    }
    aud.source = remoteSources[aud.source];
  });
} else {
  audios.forEach((aud) => {
    aud.source = `/dev/${aud.source}`;
  });
}
