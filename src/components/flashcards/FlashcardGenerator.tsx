import React, { useState } from "react";
import { generateFlashcards } from "../../api/api";
import Flashcard from "./Flashcard";

type FlashcardType = {
  q: string;
  a: string;
  category: string;
};

const FlashcardGenerator = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const cards = await generateFlashcards(text, category);
      setFlashcards(cards);
    } catch (err) {
      alert("Failed to generate flashcards.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>🧠 AI Flashcard Generator</h2>
      <textarea
        rows={6}
        placeholder="Paste your OCR text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <input
        type="text"
        placeholder="Category (e.g., Biology)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        {flashcards.map((card, index) => (
          <Flashcard
            key={index}
            front={card.q}
            back={card.a}
            onAnswer={(correct) =>
              console.log(`Flashcard ${index + 1}: ${correct ? "✅ Correct" : "❌ Incorrect"}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardGenerator;