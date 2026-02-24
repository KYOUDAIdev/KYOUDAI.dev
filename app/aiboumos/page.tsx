'use client';

import { useState, useEffect } from 'react';
import AiBouMoSHeader from './components/AiBouMoSHeader';
import AiBouMoSMarquis from './components/AiBouMoSMarquis';
import AiBouMoSSearchBar from './components/AiBouMoSSearchBar';
import YATTAiCard from './components/YATTAiCard';
import AiBouMoSFooter from './components/AiBouMoSFooter';

// SSOT-compliant AiBou card interface
interface AiBouCard {
  id: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  color: string;
  zodiacKeywords: string[];
  houseColors?: Record<string, string>;
  backgroundImage: string; // YATTAi.jpg
  heroAvatar?: string; // KYARA-hero.png
  files: {
    kyara: string;
    metale?: string;
  };
}

export default function AiBouMoS() {
  const [cards, setCards] = useState<AiBouCard[]>([]);
  const [selectedAiBou, setSelectedAiBou] = useState<AiBouCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    textToSpeech: false,
    dyslexicFont: false
  });

  // SSOT: Data hydration via cardCatcher.js (SSR/build-time)
  useEffect(() => {
    // In production, this would be SSR hydrated from cardCatcher.js
    // For now, simulate the data structure
    const mockCards: AiBouCard[] = [
      {
        id: 'aithena',
        name: 'AiTHENA',
        tagline: 'The Architect of Digital Blueprints',
        description: 'AiTHENA specializes in creating comprehensive SiteMapUJ documents...',
        role: 'SiteMapUJ Development',
        color: '#FF6B9D',
        zodiacKeywords: ['Architecture', 'Design', 'Planning', 'Structure'],
        houseColors: { primary: '#FF6B9D', accent: '#FF8FB3' },
        backgroundImage: '/aiboumos/yattai/aithena/AiTHENA.YATTAi.jpg',
        heroAvatar: '/aiboumos/yattai/aithena/AiTHENA.KYARA-hero.png',
        files: {
          kyara: '/aiboumos/yattai/aithena/AiTHENA.KYARA.md',
          metale: '/aiboumos/yattai/aithena/AiTHENA.METALE.md'
        }
      }
    ];
    setCards(mockCards);
  }, []);

  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.zodiacKeywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (url: string, filename: string) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(err => console.error('Download failed:', err));
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* SSOT Component: AiBouMoS_Header */}
      <AiBouMoSHeader 
        isAuthenticated={isAuthenticated}
        onAccessibilityClick={() => setShowAccessibility(true)}
      />

      {/* SSOT Component: AiBouMoS_Marquis */}
      <AiBouMoSMarquis />

      <div className="max-w-7xl mx-auto w-full p-8">
        {/* SSOT Component: AiBouMoS_Guide_and_Search_Bar */}
        <AiBouMoSSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* SSOT Component: AiBouMoS_YATTAis - Inline grid (no separate container) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map(card => (
            <YATTAiCard
              key={card.id}
              id={card.id}
              name={card.name}
              role={card.role}
              description={card.description}
              color={card.color}
              backgroundImage={card.backgroundImage}
              zodiacKeywords={card.zodiacKeywords}
              houseColors={card.houseColors}
              isSelected={selectedAiBou?.id === card.id}
              onClick={() => setSelectedAiBou(card)}
              onKeywordClick={handleKeywordClick}
            />
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* SSOT Component: AiBouMoS_Footer */}
      <AiBouMoSFooter />

      {/* SSOT Inline Modal: AiBouMoS_Accessibility */}
      {showAccessibility && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" 
          onClick={() => setShowAccessibility(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <div 
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowAccessibility(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-white transition-colors"
              aria-label="Close accessibility settings"
            >
              ✕
            </button>

            <h2 
              id="accessibility-title"
              className="text-2xl font-mono font-bold mb-6 text-aiboumos"
            >
              Accessibility Settings
            </h2>

            <div className="space-y-6">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <label htmlFor="high-contrast" className="font-mono text-gray-300">
                  High Contrast Mode
                </label>
                <button
                  id="high-contrast"
                  onClick={() => setAccessibilitySettings(prev => ({ ...prev, highContrast: !prev.highContrast }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    accessibilitySettings.highContrast ? 'bg-aiboumos' : 'bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={accessibilitySettings.highContrast}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      accessibilitySettings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Text-to-Speech */}
              <div className="flex items-center justify-between">
                <label htmlFor="text-to-speech" className="font-mono text-gray-300">
                  Text-to-Speech
                </label>
                <button
                  id="text-to-speech"
                  onClick={() => setAccessibilitySettings(prev => ({ ...prev, textToSpeech: !prev.textToSpeech }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    accessibilitySettings.textToSpeech ? 'bg-aiboumos' : 'bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={accessibilitySettings.textToSpeech}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      accessibilitySettings.textToSpeech ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Dyslexic Font */}
              <div className="flex items-center justify-between">
                <label htmlFor="dyslexic-font" className="font-mono text-gray-300">
                  Dyslexic-Friendly Font
                </label>
                <button
                  id="dyslexic-font"
                  onClick={() => setAccessibilitySettings(prev => ({ ...prev, dyslexicFont: !prev.dyslexicFont }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    accessibilitySettings.dyslexicFont ? 'bg-aiboumos' : 'bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={accessibilitySettings.dyslexicFont}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      accessibilitySettings.dyslexicFont ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAccessibility(false)}
              className="w-full mt-8 px-4 py-3 font-mono bg-aiboumos text-black font-bold rounded hover:bg-opacity-80 transition-opacity"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* SSOT Inline Modal: AiBou Profile (Sub-Profile_Link destination) */}
      {selectedAiBou && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-8" 
          onClick={() => setSelectedAiBou(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-title"
        >
          <div 
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{ borderTop: `4px solid ${selectedAiBou.houseColors?.primary || selectedAiBou.color}` }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedAiBou(null)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-white transition-colors"
              aria-label="Close profile"
            >
              ✕
            </button>

            {/* Hero Section - SSOT: KYARA-hero.png */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div 
                className="w-32 h-32 rounded-lg bg-cover bg-center border-2 border-gray-800 shrink-0"
                style={{ backgroundImage: `url(${selectedAiBou.heroAvatar || selectedAiBou.backgroundImage})` }}
                role="img"
                aria-label={`${selectedAiBou.name} hero avatar`}
              />
              <div>
                <h2 
                  id="profile-title"
                  className="text-4xl font-mono font-bold mb-2 tracking-wider" 
                  style={{ color: selectedAiBou.houseColors?.primary || selectedAiBou.color }}
                >
                  {selectedAiBou.name}
                </h2>
                <p className="text-xl font-mono text-gray-300 font-bold mb-2">
                  {selectedAiBou.tagline}
                </p>
                <p className="text-sm font-mono px-3 py-1 bg-gray-800 rounded-full inline-block border border-gray-700 text-gray-400">
                  {selectedAiBou.role}
                </p>
              </div>
            </div>

            {/* Main Bio - SSOT: METALE.md full content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-mono font-bold mb-3 border-b border-gray-800 pb-2">
                  Description
                </h3>
                <p className="text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {selectedAiBou.description}
                </p>
              </div>

              {/* SSOT: Subscription_Logic (Free/Paid/Buy) */}
              <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-mono font-bold mb-4 text-aiboumos">
                  Acquire {selectedAiBou.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Free Tier */}
                  <div className="p-4 border border-gray-700 rounded bg-gray-900">
                    <p className="font-mono font-bold mb-1">Free Tier</p>
                    <p className="text-xs font-mono text-gray-400">100 calls/month</p>
                    <button className="mt-3 w-full px-3 py-2 text-sm font-mono bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                      Copy URL
                    </button>
                  </div>

                  {/* Paid Tier */}
                  <div className="p-4 border border-aiboumos rounded bg-gray-900 shadow-[0_0_15px_rgba(128,64,192,0.1)]">
                    <p className="font-mono font-bold mb-1 text-aiboumos">Paid Tier</p>
                    <p className="text-xs font-mono text-gray-400">$10/month (Unlimited)</p>
                    <button className="mt-3 w-full px-3 py-2 text-sm font-mono bg-aiboumos text-black hover:bg-opacity-80 rounded transition-opacity">
                      Subscribe via Stripe
                    </button>
                  </div>

                  {/* Buy AiBou */}
                  <div className="p-4 border border-gray-700 rounded bg-gray-900">
                    <p className="font-mono font-bold mb-1 text-gray-300">Buy AiBou</p>
                    <p className="text-xs font-mono text-gray-400">$5K-$10K Source Package</p>
                    <button className="mt-3 w-full px-3 py-2 text-sm font-mono bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                      Inquiry
                    </button>
                  </div>
                </div>

                {/* SSOT: Delivery_Mechanism - MCP Configuration */}
                <div className="mb-4">
                  <p className="text-sm font-mono font-bold text-gray-400 mb-2">
                    MCP Configuration String:
                  </p>
                  <code className="block p-4 bg-black text-green-400 text-sm font-mono rounded border border-gray-800 overflow-x-auto">
                    npx -y @kyoudai/prappt-fetcher --key USER_SIG_KEY --id {selectedAiBou.id}
                  </code>
                </div>

                {/* Download Files */}
                <div className="space-y-2 mt-6">
                  <p className="text-sm font-mono font-bold text-gray-400 mb-2">
                    Download Source Files:
                  </p>
                  <button
                    onClick={() => handleDownload(selectedAiBou.files.kyara, `${selectedAiBou.id}-KYARA.md`)}
                    className="w-full px-4 py-3 font-mono bg-gray-800 hover:bg-gray-700 rounded transition-colors text-left flex items-center gap-3"
                  >
                    <span>📄</span> {selectedAiBou.name}.KYARA.md
                  </button>
                  {selectedAiBou.files.metale && (
                    <button
                      onClick={() => handleDownload(selectedAiBou.files.metale!, `${selectedAiBou.id}-METALE.md`)}
                      className="w-full px-4 py-3 font-mono bg-gray-800 hover:bg-gray-700 rounded transition-colors text-left flex items-center gap-3"
                    >
                      <span>📖</span> {selectedAiBou.name}.METALE.md
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
