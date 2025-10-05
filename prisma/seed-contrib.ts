// scripts/seed-contributions.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FAKE_REPOS = [
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

const CONTRIBUTION_TYPES = ["typo", "emoji", "quote", "exclamation"] as const;
type ContributionType = (typeof CONTRIBUTION_TYPES)[number];

const TYPOS = [
  "teh -> the",
  "projct -> project",
  "awsome -> awesome",
  "recieve -> receive",
  "funtion -> function",
];

const QUOTES = [
  '"Code is poetry." - Unknown',
  '"It works on my machine." - Everyone',
  '"Ship fast, fix later." - Product Team',
  '"I refactored nothing and it still worked." - Legend',
];

const EMOJIS = ["🚀", "✨", "🔥", "💯", "🎉", "💪", "⚡", "🌟", "🦄", "🎯"];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateWithinDays(daysBack = 45) {
  const now = Date.now();
  const past = now - randInt(0, daysBack * 24 * 60 * 60 * 1000);
  // randomize hour/min/sec for variety
  const date = new Date(past);
  date.setHours(randInt(0, 23), randInt(0, 59), randInt(0, 59), 0);
  return date;
}

function randomFrom<T>(arr: readonly T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log("🔁 Starting contribution seeding script...");

  // 1. Ensure user exists
  const username = "DivyanshuLohani";
  const user = await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      // add any required fields your User model needs (email, name, etc.)
      // Example: displayName: "Divyanshu", email: "divyanshu@example.com"
    } as any,
  });
  console.log(`👤 Ensured user: ${user.username} (id: ${user.id})`);

  // 2. Ensure repositories exist (upsert defaults if none)
  const existingCount = await prisma.repository.count();
  if (existingCount === 0) {
    console.log("📦 No repositories found. Upserting default fake repos...");
    await Promise.all(
      FAKE_REPOS.map((r) =>
        prisma.repository.upsert({
          where: { name: r.name },
          update: {},
          create: {
            name: r.name,
            description: r.description,
            stars: randInt(0, 2000),
          },
        })
      )
    );
    console.log("✅ Default repos seeded.");
  }

  const repos = await prisma.repository.findMany();
  console.log(`📚 Found ${repos.length} repositories.`);

  // 3. Prepare contributions
  const totalContributions = 300; // change this to create more/less
  const contributionsData: Array<{
    userId: string;
    repositoryId: string;
    type: ContributionType;
    content: string;
    createdAt: Date;
  }> = [];

  for (let i = 0; i < totalContributions; i++) {
    const repo = randomFrom(repos);
    const type = randomFrom(CONTRIBUTION_TYPES);
    let content = "";

    switch (type) {
      case "typo":
        content = `Fixed minor typo: ${randomFrom(TYPOS)}`;
        break;
      case "emoji":
        content = `Added emoji ${randomFrom(EMOJIS)}`;
        break;
      case "quote":
        content = `Added quote: ${randomFrom(QUOTES)}`;
        break;
      case "exclamation":
        content = `Replaced periods with exclamations!!!`;
        break;
    }

    contributionsData.push({
      userId: user.id,
      repositoryId: String(repo.id),
      type,
      content,
      createdAt: randomDateWithinDays(45),
    });
  }

  console.log(
    `✍️  Creating ${contributionsData.length} contributions... (this may take a moment)`
  );

  // 4. Use createMany for speed (if your DB supports it). Otherwise you can loop create.
  // Note: createMany does not return created rows; it's bulk insert.
  // If your Contribution model uses composite unique keys and createMany throws duplicates, adjust.
  try {
    // If your DB or Prisma version doesn't support createMany with Date, adjust to looped create.
    await prisma.contribution.createMany({
      data: contributionsData.map((c) => ({
        userId: c.userId,
        repositoryId: c.repositoryId,
        type: c.type,
        content: c.content,
        createdAt: c.createdAt,
      })),
      skipDuplicates: true,
    });
    console.log("✅ Contributions inserted (bulk).");
  } catch (err) {
    console.warn(
      "⚠️ Bulk insert failed or unsupported. Falling back to single inserts...",
      err
    );
    for (const item of contributionsData) {
      await prisma.contribution.create({
        data: {
          userId: item.userId,
          repositoryId: String(item.repositoryId),
          type: item.type,
          content: item.content,
          createdAt: item.createdAt,
        },
      });
    }
    console.log("✅ Contributions inserted (sequential).");
  }

  // 5. Count contributions for the user
  const totalForUser = await prisma.contribution.count({
    where: { userId: user.id },
  });
  console.log(`📊 Total contributions for ${user.username}: ${totalForUser}`);

  // 6. Award badges based on requirements in badges table
  const allBadges = await prisma.badge.findMany();
  if (allBadges.length === 0) {
    console.log(
      "🏷️ No badges found in DB. Skipping badge awarding. If you'd like, run your badges seed first."
    );
  } else {
    const toAward = allBadges.filter((b) => {
      // if badge has numeric requirement field
      // adjust property name if different in your schema
      const req = (b as any).requirement ?? (b as any).threshold ?? 0;
      return req <= totalForUser;
    });

    if (toAward.length === 0) {
      console.log("🔕 No badges to award (user needs more contributions).");
    } else {
      console.log(
        `🏅 Awarding ${toAward.length} badge(s) to ${user.username}...`
      );
      for (const badge of toAward) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              badges: {
                connect: { id: badge.id },
              },
            },
          });
          console.log(`  ➕ Awarded badge: ${badge.name}`);
        } catch (err) {
          console.warn(`  ⚠️ Failed to award badge ${badge.name}:`, err);
        }
      }
    }
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed script failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
