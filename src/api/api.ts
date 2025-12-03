import axios from "axios";

export const generateFlashcards = async (text: string, category: string) => {
  try {
    const response = await axios.post("https://generator-ai-flashcard.netlify.app/api/generate", {
      text,
      category,
    });

    return response.data.flashcards;
  } catch (error: any) {
    console.error("❌ Error generating flashcards:", error.response?.data || error.message);
    throw new Error("Failed to generate flashcards");
  }
};
