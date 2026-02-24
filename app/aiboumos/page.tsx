'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AiBouCard {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  houseColor: string;
  yattaiImage: string;
  heroImage: string;
}

interface AiBouMoSData {
  cards: AiBouCard[];
  count: number;
  generatedAt: string;
}

interface A11ySettings {
  highContrast: boolean;
  tts: boolean;
  dyslexicFont: boolean;
}

const MARQUEE_ITEMS = [
  'MedMgr', 'Medical', 'AiTHENA', 'Research', 'Kyara',
  'Image_Generation', 'KyaraSynth', 'EudAImonium',
  'MedMgr', 'Medical', 'AiTHENA', 'Research', 'Kyara',
  'Image_Generation', 'KyaraSynth', 'EudAImonium',
];

function getMcpConfig(card: AiBouCard): string {
  return JSON.stringify(
    {
      mcpServers: {
        'AiBou-Partner': {
          command: 'npx',
          args: ['-y', '@kyoudai/prappt-fetcher', '--key', 'USER_SIG_KEY', '--id', card.id],
        },
      },
    },
    null,
    2
  );
}

export default function AiBouMoS() {
  const [data, setData] = useState<AiBouMoSData | null>(null);
  const [selectedAiBou, setSelectedAiBou] = useState<AiBouCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated] = useState(false);
  const [showA11y, setShowA11y] = useState(false);
  const [a11y, setA11y] = useState<A11ySettings>({ highContrast: false, tts: false, dyslexicFont: false });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/data/aiboumos.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const filteredCards = data?.cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleKeywordClick = (kw: string) => {
    setSearchTerm(kw);
    document.getElementById('aiboumos-search')?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyMcpConfig = (card: AiBouCard) => {
    navigator.clipboard.writeText(getMcpConfig(card));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleA11y = (key: keyof A11ySettings) =>
    setA11y(prev => ({ ...prev, [key]: !prev[key] }));

  const rootClass = [
    'min-h-screen bg-black text-white flex flex-col font-mono',
    a11y.highContrast ? 'contrast-200' : '',
  ].filter(Boolean).join(' ');

  return (
    <main className={rootClass}>

      {/* ── AiBouMoS_Header ─────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">

        {/* Left: KYOUDAI.dev */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-xl font-bold tracking-widest hover:text-aiboumos transition-colors"
          >
            KYOUDAI.dev
          </Link>
        </div>

        {/* Center: AiBou Mall of Services */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold tracking-widest text-aiboumos">
            AiBou Mall of Services
          </h1>
        </div>

        {/* Right: Auth + Accessibility */}
        <div className="flex-1 flex justify-end items-center gap-3">
          {isAuthenticated ? (
            <Link
              href="/AiBouMoS/myaccount"
              className="text-base border border-gray-600 hover:border-aiboumos px-4 py-1 rounded transition-colors"
            >
              My Account
            </Link>
          ) : (
            <>
              <Link
                href="/AiBouMoS/login"
                className="text-base border border-gray-600 hover:border-aiboumos px-4 py-1 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                href="/AiBouMoS/createaccount"
                className="text-base bg-aiboumos text-black font-bold px-4 py-1 rounded hover:opacity-80 transition-opacity"
              >
                Create Account
              </Link>
            </>
          )}
          <button
            onClick={() => setShowA11y(true)}
            className="text-base border border-gray-700 hover:border-white px-3 py-1 rounded transition-colors"
            title="Accessibility Options"
          >
            [A11y]
          </button>
        </div>
      </header>

      {/* ── AiBouMoS_Marquis ────────────────────────────────────── */}
      <div className="w-full bg-gray-900 border-b border-gray-800 py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              onClick={() => handleKeywordClick(item)}
              className="mx-8 text-sm text-gray-400 hover:text-aiboumos cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── AiBouMoS_Guide_and_Search_Bar ───────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-8 pt-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 select-none pointer-events-none">
              [~]
            </span>
            <input
              id="aiboumos-search"
              type="text"
              placeholder="Search AiBous by name, role, or keyword..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-aiboumos transition-colors text-base"
            />
          </div>
          <Link
            href="/aiboumos-guide"
            className="px-5 py-3 border border-gray-600 hover:border-white rounded-lg transition-colors text-base"
          >
            [Guide]
          </Link>
        </div>
      </div>

      {/* ── AiBouMoS_YATTAis ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-8 py-6">
        {filteredCards?.length === 0 && (
          <p className="text-gray-500 text-center py-16">No AiBous match your search.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards?.map(card => (
            <article
              key={card.id}
              className="relative overflow-hidden border rounded-xl flex flex-col justify-end group transition-all duration-300 hover:shadow-lg"
              style={{
                height: '20vh',
                minHeight: '200px',
                borderColor: card.houseColor || '#333',
                '--house-color': card.houseColor || '#8040C0',
              } as React.CSSProperties}
            >
              {/* Background: {AiBou}.YATTAi.jpg — 30% opacity, focal point center 40% */}
              {card.yattaiImage && (
                <div
                  className="absolute inset-0 w-full h-full bg-cover transition-opacity duration-300 opacity-30 group-hover:opacity-40"
                  style={{
                    backgroundImage: `url(${card.yattaiImage})`,
                    backgroundPosition: 'center 40%',
                  }}
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

              {/* Card content */}
              <div className="relative z-10 p-5">

                {/* AiBou_Name (L) → routes to profile */}
                <Link
                  href={`/AiBouMoS/YATTAi/${card.id}`}
                  className="block text-lg font-bold tracking-wide mb-1 hover:opacity-80 transition-opacity"
                  style={{ color: card.houseColor || '#8040C0' }}
                >
                  {card.name}
                </Link>

                {/* AiBou_Description (S) — truncated → routes to profile */}
                <p
                  className="text-sm text-gray-300 line-clamp-2 mb-3 cursor-pointer hover:text-white transition-colors"
                  onClick={() => setSelectedAiBou(card)}
                >
                  {card.description || '\u00A0'}
                </p>

                {/* Keywords (SS) × 4 — onClick → setSearchTerm */}
                <div className="flex flex-wrap gap-2">
                  {card.keywords.slice(0, 4).map((kw, i) => (
                    <button
                      key={i}
                      onClick={() => handleKeywordClick(kw)}
                      className="text-xs px-2 py-1 rounded border bg-black/40 hover:bg-black/80 transition-colors"
                      style={{
                        borderColor: card.houseColor || '#555',
                        color: card.houseColor || '#aaa',
                      }}
                    >
                      [{kw}]
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* ── AiBouMoS_Footer ─────────────────────────────────────── */}
      <footer className="border-t border-gray-800 bg-gray-900 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col gap-4">

          {/* Versioning */}
          <div className="text-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-widest hover:text-aiboumos transition-colors"
            >
              [KYOUDAI.dev | est. 2026]
            </Link>
          </div>

          {/* Quick Links */}
          <div className="text-center text-base">
            <Link href="/respengr" className="text-gray-400 hover:text-white transition-colors">
              [RespEngr]
            </Link>
            <span className="text-gray-700 mx-2">|</span>
            <Link href="/prappt" className="text-gray-400 hover:text-white transition-colors">
              [PrAPPt]
            </Link>
            <span className="text-gray-700 mx-2">|</span>
            <Link href="/aiboumos" className="text-aiboumos">
              [AiBouMoS]
            </Link>
          </div>

          {/* Buttons + Socials */}
          <div className="flex flex-wrap justify-end gap-4 text-sm">
            <Link href="/aiboumos-guide" className="text-gray-400 hover:text-white transition-colors">
              [AiBouMoS Guide]
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              [Contact]
            </Link>
            <a
              href="https://github.com/the-kyoudai-dev"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              [GitHub]
            </a>
            <span className="text-gray-500 cursor-not-allowed">[Discord]</span>
            <span className="text-gray-500 cursor-not-allowed">[X]</span>
          </div>
        </div>
      </footer>

      {/* ── AiBou YATTAi Detail Modal ────────────────────────────── */}
      {selectedAiBou && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-8"
          onClick={() => setSelectedAiBou(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{ borderTop: `3px solid ${selectedAiBou.houseColor || '#8040C0'}` }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAiBou(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              [X]
            </button>

            {/* Hero */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div
                className="w-28 h-28 rounded-lg border border-gray-700 shrink-0 bg-cover bg-center"
                style={{
                  backgroundImage: selectedAiBou.heroImage ? `url(${selectedAiBou.heroImage})` : 'none',
                  backgroundColor: selectedAiBou.houseColor ? `${selectedAiBou.houseColor}22` : '#111',
                }}
              />
              <div>
                <h2
                  className="text-3xl font-bold tracking-wider mb-3"
                  style={{ color: selectedAiBou.houseColor || '#8040C0' }}
                >
                  {selectedAiBou.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedAiBou.keywords.slice(0, 4).map((kw, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded border"
                      style={{
                        borderColor: selectedAiBou.houseColor || '#555',
                        color: selectedAiBou.houseColor || '#aaa',
                      }}
                    >
                      [{kw}]
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description (full METALE.md narrative) */}
            <div className="mb-8">
              <h3 className="text-base font-bold mb-2 border-b border-gray-800 pb-2">About</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                {selectedAiBou.description || 'No description available.'}
              </p>
            </div>

            {/* Subscription Logic */}
            <div className="bg-black/50 rounded-lg border border-gray-800 p-6">
              <h3
                className="text-base font-bold mb-4"
                style={{ color: selectedAiBou.houseColor || '#8040C0' }}
              >
                Acquire {selectedAiBou.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">

                {/* Free Tier — CopyButton */}
                <div className="p-4 border border-gray-700 rounded bg-gray-900 flex flex-col gap-2">
                  <p className="font-bold text-sm">Free Tier</p>
                  <p className="text-xs text-gray-400">100 calls / month</p>
                  <button
                    onClick={() => copyMcpConfig(selectedAiBou)}
                    className="mt-auto text-xs px-3 py-2 border border-gray-600 hover:border-white rounded transition-colors"
                  >
                    {copied ? '[Copied!]' : '[Copy Config]'}
                  </button>
                </div>

                {/* Paid Tier — StripeLink */}
                <div
                  className="p-4 border rounded bg-gray-900 flex flex-col gap-2"
                  style={{
                    borderColor: selectedAiBou.houseColor || '#8040C0',
                    boxShadow: `0 0 15px ${selectedAiBou.houseColor || '#8040C0'}22`,
                  }}
                >
                  <p className="font-bold text-sm" style={{ color: selectedAiBou.houseColor }}>
                    Paid Tier
                  </p>
                  <p className="text-xs text-gray-400">$10 / month — Unlimited</p>
                  <a
                    href="#stripe"
                    className="mt-auto text-xs px-3 py-2 rounded font-bold text-center text-black hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: selectedAiBou.houseColor || '#8040C0' }}
                  >
                    [Subscribe →]
                  </a>
                </div>

                {/* Buy AiBou — Inquiry */}
                <div className="p-4 border border-gray-700 rounded bg-gray-900 flex flex-col gap-2">
                  <p className="font-bold text-sm text-gray-300">Buy AiBou</p>
                  <p className="text-xs text-gray-400">$5K–$10K Source Package</p>
                  <Link
                    href="/contact"
                    className="mt-auto text-xs px-3 py-2 border border-gray-600 hover:border-white rounded transition-colors text-center"
                  >
                    [Inquire →]
                  </Link>
                </div>
              </div>

              {/* Delivery: MCP JSON Configuration */}
              <div>
                <p className="text-xs font-bold text-gray-400 mb-2">MCP Configuration:</p>
                <pre className="p-4 bg-black text-green-400 text-xs rounded border border-gray-800 overflow-x-auto leading-relaxed">
                  {getMcpConfig(selectedAiBou)}
                </pre>
              </div>
            </div>

            {/* Full profile link */}
            <div className="mt-6 text-right">
              <Link
                href={`/AiBouMoS/YATTAi/${selectedAiBou.id}`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                [Full Profile →]
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── AiBouMoS_Accessibility Modal ────────────────────────── */}
      {showA11y && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowA11y(false)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Accessibility</h2>
              <button onClick={() => setShowA11y(false)} className="text-gray-500 hover:text-white">
                [X]
              </button>
            </div>

            <div className="space-y-5">
              {(
                [
                  { key: 'highContrast' as const, label: 'High Contrast' },
                  { key: 'tts' as const, label: 'Text-to-Speech' },
                  { key: 'dyslexicFont' as const, label: 'Dyslexic Font' },
                ] as const
              ).map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{label}</span>
                  <button
                    onClick={() => toggleA11y(key)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${a11y[key] ? 'bg-aiboumos' : 'bg-gray-700'}`}
                    aria-pressed={a11y[key]}
                    aria-label={label}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${a11y[key] ? 'right-0.5' : 'left-0.5'}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
