import Flashcard from "./Flashcard";

export default function FlashcardDeck() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Flashcard front="What is React?" back="A JavaScript library for building UIs." />
      <Flashcard front="What is JSX?" back="A syntax extension for JavaScript." />
      <Flashcard front="What is a component?" back="A reusable piece of UI." />
    </div>
  );
}