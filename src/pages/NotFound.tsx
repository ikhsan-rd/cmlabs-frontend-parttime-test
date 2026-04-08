import { TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2.5rem)] px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center mb-6">
          <TriangleAlert className="w-16 h-16 text-yellow-500 animate-bounce" />
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          404
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          <TriangleAlert className="w-5 h-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
