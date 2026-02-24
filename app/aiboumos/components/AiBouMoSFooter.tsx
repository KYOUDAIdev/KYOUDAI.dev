'use client';

import Link from 'next/link';

export default function AiBouMoSFooter() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 mt-20">
      <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Versioning */}
        <div className="text-gray-500 font-mono text-xl">
          [KYOUDAI.dev | est. 2026]
        </div>

        {/* Quick Links */}
        <div className="flex gap-8 font-mono text-lg">
          <Link 
            href="/respengr" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            [RespEngr]
          </Link>
          <Link 
            href="/prappt" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            [PrAPPt]
          </Link>
          <Link 
            href="/aiboumos" 
            className="text-aiboumos"
          >
            [AiBouMoS]
          </Link>
        </div>

        {/* Buttons & Socials */}
        <div className="flex gap-4 font-mono text-lg">
          <Link 
            href="/aiboumos-guide" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            [AiBouMoS Guide]
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            [Contact]
          </Link>
          <a 
            href="https://github.com/the-kyoudai-dev" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            [GitHub]
          </a>
          <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            [Discord]
          </span>
          <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            [X]
          </span>
        </div>
      </div>
    </footer>
  );
}
