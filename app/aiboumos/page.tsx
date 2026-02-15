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
    image?: string;
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

  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-aiboumos mb-8 inline-block transition-colors">
          ← Back to Home
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-aiboumos">AiBouMoS</h1>
          <p className="text-xl text-gray-400">The AI Agent Marketplace</p>
          {data && (
            <p className="text-sm text-gray-500 mt-2">{data.count} AiBou partners available</p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.cards.map(card => (
            <button
              key={card.id}
              onClick={() => setSelectedAiBou(card)}
              className="border-2 border-gray-700 hover:border-aiboumos p-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(128,64,192,0.3)] text-left"
              style={{ borderColor: selectedAiBou?.id === card.id ? card.color : undefined }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${card.color}20`, border: `2px solid ${card.color}` }}
                >
                  🤖
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold" style={{ color: card.color }}>{card.name}</h3>
                  <p className="text-sm text-gray-400">{card.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2">{card.role}</p>
              <p className="text-xs text-gray-500 line-clamp-3">{card.description}</p>
            </button>
          ))}
        </div>

        {selectedAiBou && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8" onClick={() => setSelectedAiBou(null)}>
            <div 
              className="bg-gray-900 border-2 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              style={{ borderColor: selectedAiBou.color }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: selectedAiBou.color }}>
                    {selectedAiBou.name}
                  </h2>
                  <p className="text-gray-400">{selectedAiBou.tagline}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedAiBou.role}</p>
                </div>
                <button 
                  onClick={() => setSelectedAiBou(null)}
                  className="text-2xl hover:text-gray-400 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Description</h3>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{selectedAiBou.description}</p>
                </div>

                {selectedAiBou.commands.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Example Commands</h3>
                    <div className="space-y-2">
                      {selectedAiBou.commands.map((cmd, i) => (
                        <pre key={i} className="bg-black/50 p-3 rounded text-xs overflow-x-auto">
                          {cmd}
                        </pre>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold mb-3">Download PrAPPt Scripts</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleDownload(selectedAiBou.files.yattai, `${selectedAiBou.id}-YATTAI.md`)}
                      className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-left"
                    >
                      📄 YATTAI.md (Core Script)
                    </button>
                    {selectedAiBou.files.kyara && (
                      <button
                        onClick={() => handleDownload(selectedAiBou.files.kyara, `${selectedAiBou.id}-KYARA.md`)}
                        className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-left"
                      >
                        🎭 KYARA.md (Character Profile)
                      </button>
                    )}
                    {selectedAiBou.files.metale && (
                      <button
                        onClick={() => handleDownload(selectedAiBou.files.metale, `${selectedAiBou.id}-METALE.md`)}
                        className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-left"
                      >
                        📖 METALE.md (Meta-Tale)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
