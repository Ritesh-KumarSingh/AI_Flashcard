import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-300">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-indigo-500 hover:underline">Go back home</Link>
    </div>
  );
}