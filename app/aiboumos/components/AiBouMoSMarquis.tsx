'use client';

interface AiBouMoSMarquisProps {
  keywords?: string[];
}

export default function AiBouMoSMarquis({ 
  keywords = ["MedMgr", "Medical", "AiTHENA", "Research", "Kyara", "Image_Generation", "KyaraSynth"]
}: AiBouMoSMarquisProps) {
  return (
    <div className="w-full bg-gray-900 border-b border-gray-800 py-2 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">
        {keywords.map((keyword, i) => (
          <span 
            key={i} 
            className="mx-8 text-sm font-mono text-gray-400 hover:text-aiboumos cursor-pointer transition-colors"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
