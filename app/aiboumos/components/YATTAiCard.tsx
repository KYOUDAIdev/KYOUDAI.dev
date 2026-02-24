'use client';

// SSOT-compliant YATTAi Card per SiteMapUJAi specification
interface YATTAiCardProps {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  backgroundImage: string; // YATTAi.jpg per SSOT KyaraSynth Image_1
  zodiacKeywords: string[]; // From KYARA.md per SSOT Kyara mapping
  houseColors?: Record<string, string>; // From KYARA.md per SSOT Kyara mapping
  isSelected?: boolean;
  onClick: () => void;
  onKeywordClick: (keyword: string) => void;
}

export default function YATTAiCard({
  id,
  name,
  role,
  description,
  color,
  backgroundImage,
  zodiacKeywords,
  houseColors,
  isSelected = false,
  onClick,
  onKeywordClick
}: YATTAiCardProps) {
  // Extract first 4 keywords per SSOT
  const displayKeywords = zodiacKeywords.slice(0, 4);

  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden group border-2 border-gray-800 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(128,64,192,0.4)] text-left h-80 flex flex-col justify-end"
      style={{ 
        borderColor: isSelected ? (houseColors?.primary || color) : undefined,
        ...(houseColors && {
          '--house-primary': houseColors.primary || color,
          '--house-accent': houseColors.accent || color
        } as React.CSSProperties)
      }}
      aria-label={`View ${name} details`}
    >
      {/* Background Image - SSOT: 30% opacity, center 40%, 100% width, 20% height focal */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-300"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center 40%',
          backgroundSize: '100% auto'
        }}
        aria-hidden="true"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" aria-hidden="true" />
      
      {/* Content - SSOT: AiBou_Name, AiBou_Description, Keywords */}
      <div className="relative z-10 p-6">
        {/* Name with color indicator */}
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
            style={{ backgroundColor: houseColors?.primary || color, color: houseColors?.primary || color }}
            aria-hidden="true"
          />
          <h3 
            className="text-2xl font-mono font-bold tracking-wide" 
            style={{ color: houseColors?.primary || color }}
          >
            {name}
          </h3>
        </div>

        {/* Role */}
        <p className="text-gray-300 font-mono font-bold mb-1 text-sm">
          {role}
        </p>

        {/* Description (truncated preview per SSOT KyaraMetale mapping) */}
        <p className="text-sm font-mono text-gray-400 line-clamp-2 mb-4">
          {description}
        </p>
        
        {/* Keyword Pills (max 4 per SSOT) - from zodiac_keywords array */}
        <div className="flex flex-wrap gap-2">
          {displayKeywords.map((keyword, i) => (
            <span 
              key={i}
              onClick={(e) => { 
                e.stopPropagation(); 
                onKeywordClick(keyword); 
              }}
              className="text-xs font-mono px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded border transition-colors"
              style={{ 
                borderColor: houseColors?.accent || color,
                cursor: 'pointer'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onKeywordClick(keyword);
                }
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
