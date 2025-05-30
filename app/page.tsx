import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard App</h1>
      <Link href="/dashboard" className="text-blue-500 underline">Go to Dashboard</Link>
    </main>
  );
}
