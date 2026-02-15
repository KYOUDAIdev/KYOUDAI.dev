import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-white mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">About KYOUDAI.dev</h1>
        <div className="space-y-4 text-gray-300">
          <p>
            KYOUDAI.dev is a digital playground where joy meets logic.
          </p>
          <p>
            We build tools, frameworks, and experiences that make development delightful.
          </p>
        </div>
      </div>
    </main>
  );
}
