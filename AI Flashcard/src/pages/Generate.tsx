import { useState, useEffect } from "react";
import UploadForm from "../components/upload/UploadForm";
import Flashcard from "../components/flashcards/Flashcard";
import { generateFlashcardsFromText } from "../utils/flashcard";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

type FlashcardType = {
  q: string;
  a: string;
  category: string;
};

export default function Generate() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [filter, setFilter] = useState("All");
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [stats, setStats] = useState({
    studied: 0,
    correct: 0,
    incorrect: 0,
    startTime: Date.now(),
    time: 0,
  });

  useEffect(() => {
    const savedStats = localStorage.getItem("flashcardStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        time: Math.floor((Date.now() - prev.startTime) / 1000),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("flashcardStats", JSON.stringify(stats));
  }, [stats]);

  const handleText = async (ocrText: string) => {
    try {
      setText(ocrText);
      toast.loading("Generating flashcards with AI...");
      const cards = await generateFlashcardsFromText(ocrText, category);
      setFlashcards(cards);
      setStats({
        studied: 0,
        correct: 0,
        incorrect: 0,
        startTime: Date.now(),
        time: 0,
      });
      toast.dismiss();
      toast.success("✅ Flashcards generated!");
    } catch (error) {
      toast.dismiss();
      toast.error("❌ Failed to generate flashcards.");
      console.error("AI error:", error);
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-4 relative">
      <Toaster position="top-right" />

      {/* 🌙 Dark Mode Toggle */}
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 text-sm rounded"
      >
        🌓 Toggle Theme
      </button>

      {/* 🗂️ Category Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Category:
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="General">General</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Language">Language</option>
        </select>
      </div>

      <UploadForm onText={handleText} />

      {flashcards.length > 0 && (
        <>
          {/* 📁 Save & Export */}
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => {
                localStorage.setItem("flashcards", JSON.stringify(flashcards));
                toast.success("📥 Flashcards saved to your library!");
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white rounded"
            >
              📥 Save to Library
            </button>

            <button
              onClick={() => {
                const csv = flashcards
                  .map((card) =>
                    `"${card.q.replace(/"/g, '""')}","${card.a.replace(/"/g, '""')}"`
                  )
                  .join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "flashcards.csv";
                a.click();
                toast.success("📤 Flashcards exported as CSV!");
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded"
            >
              📤 Export as CSV
            </button>

            {/* 🔍 Filter by Category */}
            <div className="ml-auto">
              <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter:
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
              >
                <option value="All">All</option>
                <option value="General">General</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Language">Language</option>
              </select>
            </div>
          </div>

          {/* 📊 Stats */}
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Studied: {stats.studied} | ✅ {stats.correct} | ❌ {stats.incorrect} | ⏱️ {stats.time}s
          </div>

          {/* 🧠 Flashcards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards
              .filter((card) => filter === "All" || card.category === filter)
              .map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Flashcard
                    front={card.q}
                    back={card.a}
                    accent={["indigo", "emerald", "amber", "rose"][i % 4] as any}
                    onAnswer={(correct) =>
                      setStats((prev) => ({
                        ...prev,
                        studied: prev.studied + 1,
                        correct: prev.correct + (correct ? 1 : 0),
                        incorrect: prev.incorrect + (correct ? 0 : 1),
                      }))
                    }
                  />
                </motion.div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

