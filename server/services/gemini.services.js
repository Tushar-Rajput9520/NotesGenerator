const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            topP: 0.95,
            maxOutputTokens: 99000
            
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "Gemini API failed");
    }

    let raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw || raw.trim() === "") {
      throw new Error("Gemini returned empty response");
    }

    raw = raw.trim();

    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", raw);
      throw new Error("Gemini returned incomplete JSON");
    }

  } catch (err) {
    console.error("Gemini Service Error:", err.message);
    throw err;
  }
};
