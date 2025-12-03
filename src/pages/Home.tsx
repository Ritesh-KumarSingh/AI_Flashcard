import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20 space-y-6">
      <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">Welcome to AI Flashcard</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Instantly turn your notes into smart summaries and interactive flashcards. Learn faster, remember longer.
      </p>
      <Link to="/generate">
        <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition">
          Get Started
        </button>
      </Link>
    </div>
  );
}