type Social = {
  url: string;
  icon: string;
  name: string;
  className?: string;
  style?: string;
};

export default {
  discordId: "781445370177126401",
  email: "dragsbruh@protonmail.com",
  primary: [
    {
      url: "https://discord.gg/W8sNRztW8f",
      className: "bg-[#a298e4] text-black font-bold",
      name: "discord",
      icon: "/icons/discord.svg",
    },
    {
      url: "https://github.com/dragsbruh",
      className: "bg-[#262626]",
      name: "github",
      icon: "/icons/github.svg",
    }
  ] as Social[],
  all: [
    {
      url: "https://www.instagram.com/dragsbruh",
      name: "instagram",
      icon: "/icons/instagram.svg",
      className: "filter-instagram-color transition-all"
    },
    {
      url: "https://bsky.app/profile/dragsbruh.bsky.social",
      name: "bluesky",
      icon: "/icons/bluesky.svg",
      className: "filter-bsky-blue transition-all", // it kinda changes to green first but lets keep that
    },
    {
      url: "monero:48cdnjb3qPt2KHd1p6wwGdjGeAZU3UyrkVbKpWq92bg7NKGS1USsDyZ4QYvK4jKzYmC2GP9C1KCocHq7iLf47NThGwZdAhwn",
      name: "imagine donating xmr to me lol",
      icon: "/icons/monero.svg",
      className: "filter-monero-orange transition-all"
    }
  ] as Social[],
};
