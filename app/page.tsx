import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
      <div className="max-w-2xl w-full space-y-12 text-center">
        <header>
          <h1 className="text-4xl font-bold mb-4">KYOUDAI.dev</h1>
          <p className="text-xl text-gray-400 italic">&quot;With joy as our telos.&quot;</p>
        </header>

        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/respengr"
              className="p-8 border-2 border-gray-700 hover:border-respengr transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]"
            >
              <h2 className="text-2xl font-bold mb-2">RespEngr</h2>
              <p className="text-gray-400">Chaotic Good. The BlogOS.</p>
            </Link>

            <Link
              href="/prappt"
              className="p-8 border-2 border-gray-700 hover:border-prappt transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            >
              <h2 className="text-2xl font-bold mb-2">PrAPPt</h2>
              <p className="text-gray-400">Structured Flow. The Framework.</p>
            </Link>
          </div>

          <Link
            href="/aiboumos"
            className="block p-8 border-2 border-gray-700 hover:border-aiboumos transition-all duration-300 hover:shadow-[0_0_20px_rgba(128,64,192,0.5)] opacity-50 cursor-not-allowed"
          >
            <h2 className="text-2xl font-bold mb-2">AiBouMoS</h2>
            <p className="text-gray-400">Coming Soon. The Mall.</p>
          </Link>
        </section>

        <nav className="flex justify-center gap-6 text-sm">
          <Link href="/about" className="hover:text-respengr transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-prappt transition-colors">
            Contact
          </Link>
          <Link href="/projects" className="hover:text-aiboumos transition-colors">
            Projects
          </Link>
        </nav>

        <footer className="text-sm text-gray-600">
          © {new Date().getFullYear()} KYOUDAI.dev
        </footer>
      </div>
    </main>
  );
}
