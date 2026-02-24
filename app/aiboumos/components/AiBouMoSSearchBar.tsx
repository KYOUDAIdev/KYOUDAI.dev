'use client';

import Link from 'next/link';

interface AiBouMoSSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function AiBouMoSSearchBar({ 
  searchTerm, 
  onSearchChange 
}: AiBouMoSSearchBarProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="flex-1 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search AiBous by name, role, or keywords..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-aiboumos transition-colors text-lg font-mono"
          aria-label="Search AiBous"
        />
      </div>
      <Link 
        href="/aiboumos-guide" 
        className="px-6 py-3 font-mono border border-gray-600 hover:border-white rounded-lg transition-colors"
      >
        Guide
      </Link>
    </div>
  );
}
