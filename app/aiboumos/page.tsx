'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AiBouCard {
  id: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  color: string;
  profileImage: string;
  files: {
    yattai: string;
    kyara?: string;
    metale?: string;
    card?: string;
  };
  commands: string[];
}

interface AiBouMoSData {
  cards: AiBouCard[];
  count: number;
  generatedAt: string;
}

export default function AiBouMoS() {
  const [data, setData] = useState<AiBouMoSData | null>(null);
  const [selectedAiBou, setSelectedAiBou] = useState<AiBouCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Placeholder auth state

  useEffect(() => {
    fetch('/data/aiboumos.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleDownload = (url: string, filename: string) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      });
  };

  const filteredCards = data?.cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white font-mono flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold hover:text-aiboumos transition-colors">
            KYOUDAI.dev
          </Link>
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold tracking-widest text-aiboumos">AiBou Mall of Services</h1>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <button className="text-gray-400 hover:text-white" title="Accessibility (High Contrast, TTS, Dyslexic Font)">
            👁️
          </button>
          {!isAuthenticated ? (
            <>
              <button className="px-4 py-2 border border-gray-600 hover:border-aiboumos rounded">
                Login
              </button>
              <button className="px-4 py-2 bg-aiboumos text-black font-bold rounded hover:bg-opacity-80">
                Create Account
              </button>
            </>
          ) : (
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded">
              My Account
            </button>
          )}
        </div>
      </header>

      {/* MARQUIS */}
      <div className="w-full bg-gray-900 border-b border-gray-800 py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          {["MedMgr", "Medical", "AiTHENA", "Research", "Kyara", "Image_Generation", "KyaraSynth"].map((link, i) => (
            <span key={i} className="mx-8 text-sm text-gray-400 hover:text-aiboumos cursor-pointer">
              {link}
            </span>
          ))}
        </div>
      </div>

      {/* SEARCH LAYER */}
      <div className="max-w-7xl mx-auto w-full p-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Search AiBous by name, role, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-aiboumos transition-colors text-lg"
            />
          </div>
          <Link href="/aiboumos-guide" className="px-6 py-3 border border-gray-600 hover:border-white rounded-lg transition-colors">
            Guide
          </Link>
        </div>

        {/* YATTAI GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards?.map(card => (
            <button
              key={card.id}
              onClick={() => setSelectedAiBou(card)}
              className="relative overflow-hidden group border-2 border-gray-800 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(128,64,192,0.4)] text-left h-80 flex flex-col justify-end"
              style={{ borderColor: selectedAiBou?.id === card.id ? card.color : undefined }}
            >
              {/* Background Image Setup */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                style={{ 
                  backgroundImage: `url(${card.profileImage || `/${card.name}.YATTAi.jpg`})`,
                  backgroundPosition: 'center 40%'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: card.color, color: card.color }}
                  />
                  <h3 className="text-2xl font-bold tracking-wide" style={{ color: card.color }}>
                    {card.name}
                  </h3>
                </div>
                <p className="text-gray-300 font-bold mb-1">{card.role}</p>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{card.description}</p>
                
                {/* Keyword Pills */}
                <div className="flex flex-wrap gap-2">
                  {card.tagline.split(' ').slice(0, 4).map((word, i) => (
                    <span 
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSearchTerm(word); }}
                      className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 cursor-pointer"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-gray-900 mt-20">
        <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-500 mb-4 md:mb-0">
            [KYOUDAI.dev | est. 2026]
          </div>
          <div className="flex gap-8 mb-4 md:mb-0">
            <Link href="/respengr" className="text-gray-400 hover:text-white">RespEngr</Link>
            <Link href="/prappt" className="text-gray-400 hover:text-white">PrAPPt</Link>
            <Link href="/aiboumos" className="text-aiboumos">AiBouMoS</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/contact" className="text-sm text-gray-500 hover:text-white">Contact</Link>
            <a href="https://github.com/the-kyoudai-dev" className="text-sm text-gray-500 hover:text-white">GitHub</a>
            <span className="text-sm text-gray-500 cursor-pointer hover:text-white">Discord</span>
            <span className="text-sm text-gray-500 cursor-pointer hover:text-white">X</span>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {selectedAiBou && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-8" onClick={() => setSelectedAiBou(null)}>
          <div 
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{ borderTop: `4px solid ${selectedAiBou.color}` }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedAiBou(null)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-white"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div 
                className="w-32 h-32 rounded-lg bg-cover bg-center border-2 border-gray-800 shrink-0"
                style={{ backgroundImage: `url(${selectedAiBou.profileImage || `/${selectedAiBou.name}.YATTAi.jpg`})` }}
              />
              <div>
                <h2 className="text-4xl font-bold mb-2 tracking-wider" style={{ color: selectedAiBou.color }}>
                  {selectedAiBou.name}
                </h2>
                <p className="text-xl text-gray-300 font-bold mb-2">{selectedAiBou.tagline}</p>
                <p className="text-sm px-3 py-1 bg-gray-800 rounded-full inline-block border border-gray-700 text-gray-400">
                  {selectedAiBou.role}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3 border-b border-gray-800 pb-2">Description</h3>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{selectedAiBou.description}</p>
              </div>

              <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-aiboumos">Acquire {selectedAiBou.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border border-gray-700 rounded bg-gray-900">
                    <p className="font-bold mb-1">Free Tier</p>
                    <p className="text-xs text-gray-400">100 calls/month</p>
                  </div>
                  <div className="p-4 border border-aiboumos rounded bg-gray-900 shadow-[0_0_15px_rgba(128,64,192,0.1)]">
                    <p className="font-bold mb-1 text-aiboumos">Paid Tier</p>
                    <p className="text-xs text-gray-400">$10/month (Unlimited)</p>
                  </div>
                  <div className="p-4 border border-gray-700 rounded bg-gray-900">
                    <p className="font-bold mb-1 text-gray-300">Enterprise</p>
                    <p className="text-xs text-gray-400">$5K-$10K Source Package</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-400 mb-2">MCP Setup Command:</p>
                  <code className="block p-4 bg-black text-green-400 text-sm rounded border border-gray-800 overflow-x-auto">
                    npx -y @kyoudai/prappt-fetcher --key USER_SIG_KEY --id {selectedAiBou.id}
                  </code>
                </div>

                <div className="space-y-2 mt-6">
                  <p className="text-sm font-bold text-gray-400 mb-2">Download Source Files:</p>
                  <button
                    onClick={() => handleDownload(selectedAiBou.files.yattai, `${selectedAiBou.id}-YATTAI.md`)}
                    className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-left flex items-center gap-3"
                  >
                    <span>📄</span> {selectedAiBou.name}.YATTAI.md (Core Script)
                  </button>
                  {selectedAiBou.files.card && (
                    <button
                      onClick={() => handleDownload(selectedAiBou.files.card, `${selectedAiBou.id}-CARD.md`)}
                      className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-left flex items-center gap-3"
                    >
                      <span>🎴</span> {selectedAiBou.name}.CARD.md
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
