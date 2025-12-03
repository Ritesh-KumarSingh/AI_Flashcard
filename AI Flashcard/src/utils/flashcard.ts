export async function generateFlashcardsFromText(text: string, category: string) {
  const response = await fetch("http://localhost:5000/generate-flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, category }),
  });

  if (!response.ok) throw new Error("Failed to generate flashcards");

  const data = await response.json();
  return data.flashcards;
}
