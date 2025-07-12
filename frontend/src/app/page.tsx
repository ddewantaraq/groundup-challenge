import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          To view and manage all system alerts, please proceed to the Alerts page. Stay informed and take action on the latest updates regarding your monitored machines.
        </p>
        <Link href="/alerts">
          <span className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer">
            Go to Alerts
          </span>
        </Link>
      </div>
    </div>
  );
}
