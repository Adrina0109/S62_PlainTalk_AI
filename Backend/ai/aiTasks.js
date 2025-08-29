// aiTasks.js
const fetch = require("node-fetch");
require("dotenv").config();

const MODEL_NAME = "gemini-2.0-flash"; // ✅ supported model
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

async function callGeminiAPI(prompt) {
  try {
    console.log("🔑 GEMINI_API_KEY loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text:`Explain this concept in a short, simple, and concise way with a small example. Keep it under 5-6 sentences:\n\n${prompt}` }] }],
      }),
    });

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return { response: data.candidates[0].content.parts[0].text };
    } else {
      console.error("Gemini API response structure:", JSON.stringify(data, null, 2));
      return { response: "No valid response from Gemini." };
    }
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    return { response: "Error calling Gemini API." };
  }
}

module.exports = { callGeminiAPI };
