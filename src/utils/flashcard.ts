console.log("API URL:", import.meta.env.VITE_API_URL);

import axios from "axios";

// Remove custom ImportMetaEnv and ImportMeta interfaces, use Vite's global import.meta.env

export async function generateFlashcardsFromText(text: string, category: string) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/generate`, {
    text,
    category,
  });

  return response.data.flashcards;
}
