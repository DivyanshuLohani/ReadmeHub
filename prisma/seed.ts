import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//
// Fake repositories for our glorious parody GitHub.
//
const fakeRepos = [
  {
    name: "cool-project",
    description: "The coolest project you'll ever see (probably not)",
  },
  {
    name: "next-big-thing",
    description: "The next billion dollar idea! (We think...)",
  },
  {
    name: "awesome-readme-edits",
    description: "A collection of the most groundbreaking README typo fixes",
  },
  {
    name: "emoji-overflow",
    description: "🚀🔥💯✨ Can you ever have too many emojis? 🎉🎊🎈",
  },
  {
    name: "hello-world-deluxe",
    description: "Hello World, but make it ✨fancy✨",
  },
  {
    name: "todo-app-9000",
    description:
      "Yet another todo app, but this one will definitely change your life",
  },
  {
    name: "useless-project",
    description:
      "A project so useless, it's actually useful for Hacktoberfest!",
  },
  {
    name: "motivation-quotes-api",
    description: "Get motivated one API call at a time 💪",
  },
  {
    name: "cat-facts-supreme",
    description: "Because the world needs more cat facts",
  },
  {
    name: "blockchain-buzzword-generator",
    description: "Synergize your Web3 paradigm shift",
  },
];

//
// Badges to reward all the fake heroes out there.
//
const badges = [
  {
    name: "Fixed 10 Typos",
    description: "You found 10 typos! Grammar police salute you!",
    icon: "📝",
    requirement: 10,
  },
  {
    name: "Fixed 100 Typos",
    description: "100 typos fixed! You're a README hero!",
    icon: "🏆",
    requirement: 100,
  },
  {
    name: "Added 50 🚀 Emojis",
    description: "Rocketing to success, 50 emojis at a time!",
    icon: "🚀",
    requirement: 50,
  },
  {
    name: "Added 500 🚀 Emojis",
    description: "500 rockets! Houston, we have a contribution!",
    icon: "🌟",
    requirement: 500,
  },
  {
    name: "Motivation Master",
    description: "Added 25 motivational quotes. You inspire us!",
    icon: "💪",
    requirement: 25,
  },
  {
    name: "Early Bird",
    description: "One of the first 100 contributors!",
    icon: "🐦",
    requirement: 1,
  },
  {
    name: "Hacktoberfest Legend",
    description: "Made 50 contributions. Legend!",
    icon: "🎃",
    requirement: 50,
  },
  {
    name: "README Warrior",
    description: "100+ contributions. You ARE the README!",
    icon: "⚔️",
    requirement: 100,
  },
];

async function main() {
  console.log("🌱 Seeding database with fake open source greatness...\n");

  // Seed Repositories
  console.log("📦 Seeding Repositories...");
  await Promise.all(
    fakeRepos.map((repo) =>
      prisma.repository.upsert({
        where: { name: repo.name },
        update: {},
        create: {
          name: repo.name,
          description: repo.description,
          stars: Math.floor(Math.random() * 2000), // add randomness for fun
        },
      })
    )
  );
  console.log("✅ Repositories seeded!\n");

  // Seed Badges
  console.log("🏅 Seeding Badges...");
  await Promise.all(
    badges.map((badge) =>
      prisma.badge.upsert({
        where: { name: badge.name },
        update: {},
        create: {
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          requirement: badge.requirement,
        },
      })
    )
  );
  console.log("✅ Badges seeded!\n");

  console.log("🎉 All done! Database now contains 100% pure parody data.\n");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
