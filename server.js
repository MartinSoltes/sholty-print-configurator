import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow JSON with base64 images
const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

console.log("✅ AI server initialized. API key:", process.env.VITE_OPENAI_API_KEY ? "✔️ OK" : "❌ Missing");

// --- ✍️ AI SLOGAN GENERATION ---
app.post("/api/generate-slogan", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic || !topic.trim()) return res.status(400).json({ error: "Missing topic." });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative T-shirt slogan generator." },
        { role: "user", content: `Generate 5 short, catchy slogans about: ${topic}` },
      ],
      temperature: 0.9,
      max_tokens: 120,
    });

    const text = response.choices[0]?.message?.content || "";
    const slogans = text
      .split(/\n|\d+\./)
      .map((s) => s.trim())
      .filter((s) => s.length > 3);

    res.json({ slogans });
  } catch (error) {
    console.error("❌ Slogan generation failed:", error);
    res.status(500).json({ error: "AI slogan generation failed." });
  }
});

// --- 🖼️ Upload Reference Images ---
app.post("/api/upload-refs", upload.array("refs"), async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ error: "No images uploaded." });

    const refs = req.files.map((file) => {
      const base64 = file.buffer.toString("base64");
      return `data:${file.mimetype};base64,${base64}`;
    });

    res.json({ refs });
  } catch (error) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({ error: "Reference upload failed." });
  }
});

// --- 🎨 AI GRAPHIC GENERATION ---
app.post("/api/generate-graphics", async (req, res) => {
  try {
    const { prompt, refs } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Missing prompt." });
    }

    console.log("🎨 Generating graphics (DALL·E 3) for:", prompt);
    const referenceText = refs?.length
      ? `Use these images as inspiration: ${refs.map((_, i) => `[ref${i + 1}]`).join(", ")}.`
      : "";

    const images = [];

    // DALL·E 3 only allows n=1, so we loop manually
    for (let i = 0; i < 3; i++) {
      const result = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Create a simple, one-color, vector-style graphic suitable for vinyl cutting based on this idea: "${prompt}". Avoid gradients, text, and complex shading. Use solid shapes only. ${referenceText}`,
        size: "1024x1024",
        quality: "standard",
        style: "vivid"
      });

      const url = result.data?.[0]?.url;
      if (url) images.push(url);
    }

    console.log(`✅ Generated ${images.length} images`);
    res.json({ images });
  } catch (error) {
    console.error("❌ Graphic generation failed:", error.response?.data || error.message || error);
    res.status(500).json({ error: error.message || "AI graphics generation failed." });
  }
});

// --- 🚀 SERVER START ---
const PORT = process.env.PORT || 5050;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
