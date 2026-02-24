'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AiBouMoSCreateAccount() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleInit: '',
    lastName: '',
    email: '',
    verificationCode: '',
    referralEmails: '',
    receiveNotifications: false
  });

  const [emailVerificationState, setEmailVerificationState] = useState<'idle' | 'sent' | 'verified'>('idle');
  const [verificationCodeState, setVerificationCodeState] = useState<'idle' | 'ok' | 'failed'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create account:', formData);
  };

  const handleSendVerification = () => {
    console.log('Sending verification to:', formData.email);
    setEmailVerificationState('sent');
  };

  const handleVerifyCode = () => {
    // Simulate verification
    if (formData.verificationCode.length === 6) {
      setVerificationCodeState('ok');
    } else {
      setVerificationCodeState('failed');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-900 border border-gray-700 rounded-xl p-8">
        <Link href="/aiboumos" className="text-sm font-mono text-gray-400 hover:text-white mb-6 inline-block">
          ← Back to AiBouMoS
        </Link>

        <h1 className="text-3xl font-mono font-bold text-aiboumos mb-8">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block font-mono text-sm text-gray-300 mb-2">
              Username (Up to 12 character alphanumeric)
            </label>
            <input
              id="username"
              type="text"
              maxLength={12}
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="firstName" className="block font-mono text-sm text-gray-300 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="middleInit" className="block font-mono text-sm text-gray-300 mb-2">
                Middle Init. (Optional)
              </label>
              <input
                id="middleInit"
                type="text"
                maxLength={1}
                value={formData.middleInit}
                onChange={(e) => setFormData({...formData, middleInit: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="lastName" className="block font-mono text-sm text-gray-300 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block font-mono text-sm text-gray-300 mb-2">
              E-mail Address [verify]
            </label>
            <div className="flex gap-2">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
                required
              />
              <button
                type="button"
                onClick={handleSendVerification}
                className="px-4 py-3 font-mono bg-gray-800 border border-gray-700 hover:border-aiboumos rounded transition-colors"
              >
                {emailVerificationState === 'idle' ? 'Verification email' : 'SEND_AGAIN'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="verificationCode" className="block font-mono text-sm text-gray-300 mb-2">
              Verification Code [send]
            </label>
            <div className="flex gap-2">
              <input
                id="verificationCode"
                type="text"
                value={formData.verificationCode}
                onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
                required
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                className={`px-4 py-3 font-mono rounded transition-colors ${
                  verificationCodeState === 'ok' 
                    ? 'bg-green-800 border border-green-600' 
                    : verificationCodeState === 'failed'
                    ? 'bg-red-800 border border-red-600'
                    : 'bg-gray-800 border border-gray-700 hover:border-aiboumos'
                }`}
              >
                {verificationCodeState === 'idle' ? 'OK' : verificationCodeState === 'ok' ? 'OK' : 'FAILED/TRY_AGAIN'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="referralEmails" className="block font-mono text-sm text-gray-300 mb-2">
              Referral E-mail Addresses (Optional, comma-separated)
            </label>
            <textarea
              id="referralEmails"
              value={formData.referralEmails}
              onChange={(e) => setFormData({...formData, referralEmails: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-aiboumos"
              rows={3}
              placeholder="friend@example.com, colleague@example.com"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="notifications"
              type="checkbox"
              checked={formData.receiveNotifications}
              onChange={(e) => setFormData({...formData, receiveNotifications: e.target.checked})}
              className="w-5 h-5"
            />
            <label htmlFor="notifications" className="font-mono text-sm text-gray-300">
              Receive Notifications
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-aiboumos text-black font-mono font-bold py-3 rounded hover:bg-opacity-80 transition-opacity"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="font-mono text-sm text-gray-400">Already have an account? </span>
          <Link href="/aiboumos/login" className="font-mono text-sm text-aiboumos hover:underline">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
