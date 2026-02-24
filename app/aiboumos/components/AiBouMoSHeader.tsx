'use client';

import Link from 'next/link';
import { useState } from 'react';

interface AiBouMoSHeaderProps {
  isAuthenticated?: boolean;
  onAccessibilityClick?: () => void;
}

export default function AiBouMoSHeader({ 
  isAuthenticated = false,
  onAccessibilityClick 
}: AiBouMoSHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800">
      {/* Left: KYOUDAI.dev */}
      <div className="flex-1">
        <Link 
          href="/" 
          className="text-xl font-mono hover:text-aiboumos transition-colors"
        >
          KYOUDAI.dev
        </Link>
      </div>

      {/* Center: AiBou Mall of Services */}
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-mono font-bold tracking-widest text-aiboumos">
          AiBou Mall of Services
        </h1>
      </div>

      {/* Right: Auth & Accessibility */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <button 
          onClick={onAccessibilityClick}
          className="text-lg font-mono text-gray-400 hover:text-white transition-colors"
          title="Accessibility Options"
          aria-label="Open accessibility settings"
        >
          Accessibility
        </button>

        {!isAuthenticated ? (
          <>
            <Link 
              href="/aiboumos/login"
              className="px-4 py-2 font-mono text-lg border border-gray-600 hover:border-aiboumos rounded transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/aiboumos/createaccount"
              className="px-4 py-2 font-mono text-lg bg-aiboumos text-black font-bold rounded hover:bg-opacity-80 transition-opacity"
            >
              Create Account
            </Link>
          </>
        ) : (
          <Link 
            href="/aiboumos/myaccount"
            className="px-4 py-2 font-mono text-lg bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            My Account
          </Link>
        )}
      </div>
    </header>
  );
}
