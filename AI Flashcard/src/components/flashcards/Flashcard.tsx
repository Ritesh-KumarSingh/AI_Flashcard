import { useState } from "react";
import "./Flashcard.css";

type Props = {
  front: string;
  back: string;
  accent?: string;
  onAnswer?: (correct: boolean) => void;
};

export default function Flashcard({ front, back, onAnswer }: Props) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        {/* Front Face */}
        <div className="face front">
          <p>{front}</p>
        </div>

        {/* Back Face */}
        <div className="face back">
          <div className="flex flex-col items-center justify-between h-full w-full">
            <p>{back}</p>
            {onAnswer && (
              <div className="flex gap-4 mt-4 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnswer(true);
                  }}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                >
                  ✅ Correct
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnswer(false);
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                >
                  ❌ Incorrect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
