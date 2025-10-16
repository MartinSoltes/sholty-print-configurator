import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
console.log("Loaded API key prefix:", process.env.OPENAI_API_KEY?.slice(0, 8));

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- AI slogan route ---
app.post("/api/generate-slogan", async (req, res) => {
  try {
    const { topic } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You generate short, catchy slogans for T-shirts." },
        { role: "user", content: `Generate 5 creative slogans about ${topic}.` },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";
    const slogans = text
      .split(/\n|\d\./)
      .map((s) => s.trim())
      .filter((s) => s.length > 3);

    res.json({ slogans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed." });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 5050;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ AI server running on http://localhost:${PORT}`)
);

