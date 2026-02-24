'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ActiveKey {
  name: string;
  tier: string;
  link: string;
  usage?: string;
}

export default function AiBouMoSMyAccount() {
  const [userData] = useState({
    username: 'demo_user',
    firstName: 'Demo',
    middleInit: 'D',
    lastName: 'User',
    joinedDate: '2026-01-15',
    subscriptionTier: 'Free',
    email: 'demo@example.com',
    mfaConfigured: false,
    notificationsEnabled: true
  });

  const [favoriteAiBous] = useState([
    'AiTHENA',
    'EudAImonium'
  ]);

  const [activeKeys] = useState<ActiveKey[]>([
    {
      name: 'AiTHENA',
      tier: 'Free Tier',
      link: 'https://KYOUDAI.dev/aiboumos/yattai/aithena_yattai',
      usage: '88/100 remaining'
    },
    {
      name: 'EudAImonium',
      tier: 'Paid Tier - Unlimited',
      link: 'https://KYOUDAI.dev/aiboumos/yattai/eudaimonium_yattai'
    }
  ]);

  const handleCopyConfig = (aibouName: string) => {
    const config = `npx -y @kyoudai/prappt-fetcher --key USER_SIG_KEY --id ${aibouName.toLowerCase()}`;
    navigator.clipboard.writeText(config);
    alert('Configuration copied to clipboard!');
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/aiboumos" className="text-sm font-mono text-gray-400 hover:text-white mb-6 inline-block">
          ← Back to AiBouMoS
        </Link>

        <h1 className="text-3xl font-mono font-bold text-aiboumos mb-8">My Account</h1>

        {/* Account Info */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-mono font-bold mb-4">Account Information</h2>
          
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Username:</span>
              <span>{userData.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span>Hello! AiBou {userData.firstName} {userData.middleInit}. {userData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Joined:</span>
              <span>{userData.joinedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Subscription:</span>
              <span className={userData.subscriptionTier === 'Free' ? 'text-gray-300' : 'text-aiboumos'}>
                {userData.subscriptionTier}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">E-mail:</span>
              <span>{userData.email} <button className="text-aiboumos hover:underline ml-2">[change]</button></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Password:</span>
              <span>
                ••••••••
                <button className="text-aiboumos hover:underline ml-2">[forgot?]</button>
                <button className="text-aiboumos hover:underline ml-2">[change?]</button>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">MFA:</span>
              <span>
                {userData.mfaConfigured ? 'Configured' : 'Not Configured'}
                <button className="text-aiboumos hover:underline ml-2">
                  [{userData.mfaConfigured ? 'Reset' : 'Setup'}]
                </button>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Notifications:</span>
              <button className="text-aiboumos hover:underline">
                [{userData.notificationsEnabled ? 'Turn Off' : 'Turn On'}]
              </button>
            </div>
          </div>
        </div>

        {/* Favorite AiBou Partners */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-mono font-bold mb-4">My Favorite AiBou Partners</h2>
          
          <div className="space-y-2">
            {favoriteAiBous.map((aibou, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-800 p-3 rounded">
                <span className="font-mono">{aibou}</span>
                <button
                  onClick={() => handleCopyConfig(aibou)}
                  className="text-sm font-mono text-aiboumos hover:underline"
                >
                  [Copy Config]
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Keys & Configs */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-mono font-bold mb-4">Active Keys & Configurations</h2>
          
          <div className="space-y-4">
            {activeKeys.map((key, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg">{key.name}</h3>
                    <p className="text-sm font-mono text-gray-400">{key.tier}</p>
                    {key.usage && (
                      <p className="text-xs font-mono text-gray-500 mt-1">{key.usage}</p>
                    )}
                  </div>
                  <Link 
                    href={key.link}
                    className="text-sm font-mono text-aiboumos hover:underline"
                  >
                    [View]
                  </Link>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleCopyConfig(key.name)}
                    className="px-3 py-1 text-sm font-mono bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  >
                    [Copy Config]
                  </button>
                  <button className="px-3 py-1 text-sm font-mono bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                    [Rotate Key]
                  </button>
                  {key.tier.includes('Free') && (
                    <button className="px-3 py-1 text-sm font-mono bg-aiboumos text-black hover:bg-opacity-80 rounded transition-opacity">
                      [Upgrade to Paid]
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
