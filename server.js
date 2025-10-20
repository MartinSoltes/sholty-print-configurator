import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
console.log("Loaded API key prefix:", process.env.VITE_OPENAI_API_KEY?.slice(0, 8));

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

// --- AI slogan route ---
app.post("/api/generate-slogan", async (req, res) => {
  try {
    const { topic } = req.body;
    console.log("📩 Received topic:", topic);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ✅ Cheapest, fast, high quality
      messages: [
        { role: "system", content: "You are a creative slogan generator for T-shirts." },
        { role: "user", content: `Generate 5 short, catchy slogans about ${topic}.` },
      ],
      max_tokens: 100, // ✅ keeps costs under control
      temperature: 0.9, // more creative output
    });

    const text = completion.choices[0]?.message?.content || "";
    const slogans = text
      .split(/\n|\d\./)
      .map((s) => s.trim())
      .filter((s) => s.length > 3);

    res.json({ slogans });
  } catch (error) {
    console.error("❌ Error generating slogans:", error.response?.data || error.message);
    res.status(500).json({ error: error.message || "AI generation failed." });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 5050;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ AI server running on http://localhost:${PORT}`)
);

