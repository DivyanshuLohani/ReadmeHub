import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-[#183D5D]/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-56 h-56 rounded-full bg-orange-600/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#183D5D] border-2 border-orange-500 rounded-full">
            <span className="text-3xl">🎃</span>
            <span className="text-orange-500 font-bold text-lg tracking-wider">HACKTOBERFEST 2025</span>
            <span className="text-3xl">🎃</span>
          </div>
        </div>

        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
              ReadmeHub
            </h1>
            <div className="inline-block">
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                The Ultimate README Contribution Platform
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Contribute to READMEs and become a Hacktoberfest legend!
            Fix typos, add emojis 🚀, sprinkle quotes 💬, and earn prestigious badges
            for your <span className="text-orange-500 font-semibold italic">totally valuable</span> contributions!
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-orange-500/20 text-orange-500 border border-orange-500/50 rounded-full text-sm font-semibold">
              ✨ Zero Coding Required
            </span>
            <span className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-full text-sm font-semibold">
              🏆 Instant Gratification
            </span>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-full text-sm font-semibold">
              📈 Look Productive
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/auth/signin"
              className="px-10 py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              Start Contributing 🚀
            </Link>
            <Link
              href="/dashboard"
              className="px-10 py-4 bg-transparent border-2 border-[#30363d] text-white rounded-lg font-bold text-lg hover:border-orange-500/50 hover:bg-[#21262d] transition-all"
            >
              View Dashboard
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-[#161b22] border-2 border-[#30363d] p-8 rounded-xl hover:border-orange-500/50 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-2xl font-bold text-white mb-3">Contribution Graph</h3>
              <p className="text-gray-400 leading-relaxed">
                Track your README edits with a GitHub-style contribution graph that uses completely random colors for authenticity!
              </p>
            </div>

            <div className="bg-[#161b22] border-2 border-[#30363d] p-8 rounded-xl hover:border-purple-500/50 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-3">Shareable Cards</h3>
              <p className="text-gray-400 leading-relaxed">
                Export your contributions as beautiful Open Graph cards to flex your README editing skills on social media!
              </p>
            </div>

            <div className="bg-[#161b22] border-2 border-[#30363d] p-8 rounded-xl hover:border-red-500/50 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📉</div>
              <h3 className="text-2xl font-bold text-white mb-3">Quality Meter: 0/10</h3>
              <p className="text-gray-400 leading-relaxed">
                Our brutally honest assessment of README-only contributions. At least we're transparent! 😂
              </p>
            </div>
          </div>

          {/* Why ReadmeHub Section */}
          <div className="mt-20 bg-[#161b22] border-2 border-[#30363d] rounded-xl p-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
              <span>🎯</span>
              <span>Why ReadmeHub?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-white font-semibold">No Real Coding</p>
                    <p className="text-gray-400 text-sm">Why write code when you can add emojis?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-white font-semibold">Instant Recognition</p>
                    <p className="text-gray-400 text-sm">Get those green squares immediately!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-white font-semibold">Badge Collection</p>
                    <p className="text-gray-400 text-sm">Earn totally legitimate achievements</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-white font-semibold">Easy Contributions</p>
                    <p className="text-gray-400 text-sm">Just click buttons, we'll do the rest</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-white font-semibold">Look Active</p>
                    <p className="text-gray-400 text-sm">Perfect for padding your GitHub profile</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-white font-semibold">Shareable Proof</p>
                    <p className="text-gray-400 text-sm">Show off your "hard work" anywhere</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-orange-500 mb-2">∞</p>
              <p className="text-gray-400 font-medium">Pointless Edits</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-purple-400 mb-2">0</p>
              <p className="text-gray-400 font-medium">Real Code Written</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-400 mb-2">100%</p>
              <p className="text-gray-400 font-medium">Pure Entertainment</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 pt-10 border-t border-[#30363d]">
            <p className="text-gray-500 text-sm">
              🎃 ReadmeHub • Where Every Typo Fix Counts • Hacktoberfest Spirit All Year Round 🎃
            </p>
            <p className="text-gray-600 text-xs mt-2">
              *This is a parody site. We're just having fun with the README-only contribution culture!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}