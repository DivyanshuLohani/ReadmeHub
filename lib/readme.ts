// Generate Readme using ai given repo name using gemini

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateReadme(repoName: string, description: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Append a short new section to the README.md of ${repoName}.
The content must always stay on theme: GitHub, README edits, contributions, open source, developer culture, Hacktoberfest parody.

Guidelines:

Keep it 2–5 lines max.

Write it like a fake contribution log, release note, or motivational open source meme.

Add playful tone with emojis (e.g., ✨🚀📝).

Each run should generate unique, fresh, and funny content.

Avoid going off-topic — only jokes about repos, commits, issues, PRs, contributors, etc.

Style should feel like a parody of real open source seriousness."

Example outputs from this prompt:

### 📝 Contribution #42
Fixed a typo in "Hello World"… truly groundbreaking.  
This project will never be the same again 🚀✨  

### 🚀 Fake Release v0.0.3
- Added 100 more emojis to the README 🎉  
- Removed productivity… replaced with memes.  

### 👥 New Contributor Alert
@DivyanshuLohani just earned the **README Warrior** badge ⚔️  
For courageously adding a missing semicolon.  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
