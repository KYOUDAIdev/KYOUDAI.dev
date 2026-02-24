'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AiBouMoSLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState('');
  const [showMFA, setShowMFA] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login logic
    console.log('Login attempt:', { username, password });
  };

  const handleMFALogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder MFA logic
    console.log('MFA Login attempt:', { totp });
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-700 rounded-xl p-8">
        <Link href="/aiboumos" className="text-sm font-mono text-gray-400 hover:text-white mb-6 inline-block">
          ← Back to AiBouMoS
        </Link>

        <h1 className="text-3xl font-mono font-bold text-aiboumos mb-8">Login</h1>

        {!showMFA ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block font-mono text-sm text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-mono text-sm text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
                required
              />
            </div>

            <Link href="/aiboumos/forgot-password" className="text-sm font-mono text-aiboumos hover:underline">
              Forgot Password?
            </Link>

            <button
              type="submit"
              className="w-full bg-aiboumos text-black font-mono font-bold py-3 rounded hover:bg-opacity-80 transition-opacity"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleMFALogin} className="space-y-6">
            <div>
              <label htmlFor="totp" className="block font-mono text-sm text-gray-300 mb-2">
                Authenticator App TOTP
              </label>
              <input
                id="totp"
                type="text"
                value={totp}
                onChange={(e) => setTotp(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-aiboumos text-black font-mono font-bold py-3 rounded hover:bg-opacity-80 transition-opacity"
            >
              Verify & Login
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <span className="font-mono text-sm text-gray-400">Don't have an account? </span>
          <Link href="/aiboumos/createaccount" className="font-mono text-sm text-aiboumos hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
