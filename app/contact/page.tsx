import Link from 'next/link';

export default function Contact() {
  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-white mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <div className="space-y-4 text-gray-300">
          <p>Get in touch with the KYOUDAI team.</p>
          <p className="text-sm text-gray-500">[Contact form coming soon]</p>
        </div>
      </div>
    </main>
  );
}
