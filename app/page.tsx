import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-respengr rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-prappt rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-aiboumos rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl w-full space-y-16 text-center relative z-10">
        {/* Header */}
        <header className="space-y-6">
          <div className="inline-block">
            <h1 className="text-6xl md:text-8xl font-mono font-bold mb-4 bg-gradient-to-r from-respengr via-prappt to-aiboumos bg-clip-text text-transparent animate-pulse">
              KYOUDAI.dev
            </h1>
            <div className="h-1 bg-gradient-to-r from-respengr via-prappt to-aiboumos rounded-full" />
          </div>
          <p className="text-2xl md:text-3xl font-mono text-gray-300 italic">
            &quot;With joy as our telos.&quot;
          </p>
        </header>

        {/* Coming Soon Message */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white">
              Coming Soon
            </h2>
            <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-2xl mx-auto">
              We're crafting something special. A digital civilization where creativity, structure, and AI collaboration converge.
            </p>
          </div>

          {/* Portal Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* RespEngr */}
            <div className="group p-8 border-2 border-gray-800 hover:border-respengr transition-all duration-500 bg-black/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-respengr/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-4 mx-auto bg-respengr/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-2xl font-mono font-bold mb-3 text-respengr">RespEngr</h3>
                <p className="text-sm font-mono text-gray-400">Chaotic Good</p>
                <p className="text-xs font-mono text-gray-500 mt-2">The BlogOS</p>
              </div>
            </div>

            {/* PrAPPt */}
            <div className="group p-8 border-2 border-gray-800 hover:border-prappt transition-all duration-500 bg-black/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-prappt/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-4 mx-auto bg-prappt/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-mono font-bold mb-3 text-prappt">PrAPPt</h3>
                <p className="text-sm font-mono text-gray-400">Structured Flow</p>
                <p className="text-xs font-mono text-gray-500 mt-2">The Framework</p>
              </div>
            </div>

            {/* AiBouMoS */}
            <div className="group p-8 border-2 border-gray-800 hover:border-aiboumos transition-all duration-500 bg-black/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-aiboumos/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-4 mx-auto bg-aiboumos/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-2xl font-mono font-bold mb-3 text-aiboumos">AiBouMoS</h3>
                <p className="text-sm font-mono text-gray-400">AI Mall of Services</p>
                <p className="text-xs font-mono text-gray-500 mt-2">The Marketplace</p>
              </div>
            </div>
          </div>
        </section>

        {/* Status Update */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-gray-300">Building in progress</span>
          </div>
          <p className="text-sm font-mono text-gray-500">
            Expected Launch: Q1 2026
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <p className="text-lg font-mono text-gray-400">
            Want to stay updated?
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 font-mono text-lg bg-gradient-to-r from-respengr via-prappt to-aiboumos text-black font-bold rounded-lg hover:opacity-80 transition-opacity"
          >
            Get in Touch
          </Link>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-mono text-gray-600">
              © {new Date().getFullYear()} KYOUDAI.dev | est. 2026
            </p>
            <div className="flex gap-6 text-sm font-mono">
              <a href="https://github.com/the-kyoudai-dev" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                [GitHub]
              </a>
              <span className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                [Discord]
              </span>
              <span className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                [X]
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
