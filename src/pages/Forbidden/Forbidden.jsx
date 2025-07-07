import { Link } from 'react-router';
import { ShieldAlert } from 'lucide-react';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-center px-4 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-500">
          <ShieldAlert size={64} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">403 - Forbidden</h1>
        <p className="text-gray-300 mb-4">
          Sorry! You don't have permission to access this page.
        </p>
        <p className="text-gray-400 text-sm mb-6">
          This section is restricted to specific roles (e.g. admin or rider).
        </p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-200"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
