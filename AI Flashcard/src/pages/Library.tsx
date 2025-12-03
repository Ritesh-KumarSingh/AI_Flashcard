import { useState } from "react";
import Flashcard from "../components/flashcards/Flashcard";

const savedCards = [
  { q: "What is AI?", a: "Artificial Intelligence." },
  { q: "What is React?", a: "A JavaScript library for building UIs." },
];

export default function Library() {
  const [search, setSearch] = useState("");

  const filtered = savedCards.filter((card) =>
    card.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search flashcards..."
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filtered.map((card, i) => (
          <Flashcard key={i} front={card.q} back={card.a} />
        ))}
      </div>
    </div>
  );
}