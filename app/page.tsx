import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            ReadmeHub
          </h1>
          <p className="text-2xl text-white/90 max-w-2xl mx-auto">
            The Ultimate README Contribution Platform
          </p>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Contribute to READMEs and become a Hacktoberfest legend!
            Fix typos, add emojis 🚀, and earn badges for your low-effort contributions!
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/auth/signin"
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Contribution Graph</h3>
              <p className="text-white/80">Track your README edits with a colorful contribution graph!</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Shareable Cards</h3>
              <p className="text-white/80">Export your contributions as viral social media cards!</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Quality Meter: 0/10</h3>
              <p className="text-white/80">Our honest assessment of README contributions 😂</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
