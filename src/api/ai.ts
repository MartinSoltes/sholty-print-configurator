// src/api/ai.ts
const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:5050/api";

/** ✍️ Generate 5 slogans via backend */
export async function fetchSlogans(topic: string): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/generate-slogan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data: { slogans?: string[] } = await res.json();
    return data.slogans ?? [];
  } catch (err) {
    console.error("❌ fetchSlogans failed:", err);
    return [];
  }
}

/** ⬆️ Upload reference images; returns base64 data URLs */
export async function uploadRefs(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("refs", file));
  try {
    const res = await fetch(`${API_URL}/upload-refs`, { method: "POST", body: formData });
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data: { refs?: string[] } = await res.json();
    return data.refs ?? [];
  } catch (err) {
    console.error("❌ uploadRefs failed:", err);
    return [];
  }
}

/** 🎨 Generate 2–3 simple, one-color graphics (as data URLs) */
export async function generateAIGraphics(prompt: string, refs?: string[]): Promise<string[]> {
  try {
    // 🧠 Local cache key
    const cacheKey = `ai_graphics_${prompt}_${refs?.join("_") || ""}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      console.log("⚡ Using cached AI graphics for:", prompt);
      return JSON.parse(cached);
    }

    // 🌐 Call backend
    const res = await fetch(`${API_URL}/generate-graphics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, refs }),
    });

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    const data: {
      images?: { url: string; base64: string }[];
    } = await res.json();

    const result = data.images?.map((img) => img.base64) ?? [];

    // 💾 Cache results for later (browser session)
    if (result.length > 0) {
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
    }

    return result;
  } catch (err) {
    console.error("❌ generateAIGraphics failed:", err);
    return [];
  }
}
