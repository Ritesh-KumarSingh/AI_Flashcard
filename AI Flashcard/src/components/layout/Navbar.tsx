import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🧠 AI Flashcard</h1>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-500">Home</Link>
          <Link to="/generate" className="hover:text-indigo-500">Generate</Link>
          <Link to="/library" className="hover:text-indigo-500">Library</Link>
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}