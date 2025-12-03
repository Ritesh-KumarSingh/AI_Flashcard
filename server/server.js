const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ AI Flashcard Generator Backend is running with OpenRouter!");
});

app.post("/api/generate", async (req, res) => {
  const { text, category } = req.body;

  if (!text || !category) {
    return res.status(400).json({ error: "Missing text or category" });
  }

  const prompt = `
You are a helpful study assistant. Generate 5 flashcards from the following text.

Each flashcard must be a JSON object with:
- "q": a concise question
- "a": a clear answer
- "category": "${category}"

Return only a JSON array. Do not include any explanation, markdown, or formatting — just the raw JSON array.

Text:
${text}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a flashcard generator." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

let raw = response.data.choices[0].message.content;
console.log("🧠 Raw AI Output:", raw);

raw = raw.replace(/```json|```|<s>|\[B_INST\]|\[\/B_INST\]/g, "").trim();

    let flashcards;
    try {
      flashcards = JSON.parse(raw);
    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      return res.status(500).json({ error: "AI response was not valid JSON." });
    }

    res.json({ flashcards });
  } catch (error) {
    console.error("🔥 OpenRouter error:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Failed to generate flashcards" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
