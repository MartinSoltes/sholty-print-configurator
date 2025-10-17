export async function fetchSlogans(topic: string): Promise<string[]> {
  try {
    const response = await fetch("http://localhost:5050/api/generate-slogan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.slogans || [];
  } catch (err) {
    console.error("AI slogan fetch failed:", err);
    return [];
  }
}
