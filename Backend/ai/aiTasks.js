// const fetch = require("node-fetch");
// require("dotenv").config();

// const MODEL_NAME = "gemini-2.0-flash"; // ✅ supported model
// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

// async function callGeminiAPI(prompt) {
//   try {
//     console.log("🔑 GEMINI_API_KEY loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

//     const response = await fetch(GEMINI_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: `You are an assistant that explains concepts **shortly and simply**. 
// Return your response strictly in the following JSON format:

// {
//   "title": "One short title for the concept",
//   "explanation": "Simple explanation in 3-5 sentences",
//   "example": "One small clear example"
// }

// Concept to explain: ${prompt}`
//               },] }],
//       }),
//     });

//     const data = await response.json();

//      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
//       let textResponse = data.candidates[0].content.parts[0].text;

//       // 🧹 Clean ```json ... ``` wrappers if they exist
//       let cleaned = textResponse.replace(/```json\n?/, "").replace(/```/, "").trim();

//       // Try parsing JSON safely
//       try {
//         let parsed = JSON.parse(cleaned);
//         return { response: parsed };
//       } catch (err) {
//         console.warn("⚠️ Could not parse JSON. Returning raw text.");
//         return { response: cleaned };
//       }
//     } else {
//       console.error("Gemini API response structure:", JSON.stringify(data, null, 2));
//       return { response: "No valid response from Gemini." };
//     }
//   } catch (err) {
//     console.error("Error calling Gemini API:", err);
//     return { response: "Error calling Gemini API." };
//   }
// }

// module.exports = { callGeminiAPI };

// aiTasks.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // inside getGenerativeModel
tools: [
  {
    functions: {
      functionDeclarations: [
        {
          name: "explainTopic",
          description: "Explain a topic in simple terms with examples.",
          parameters: {
            type: "object",
            properties: {
              title: { type: "string" },
              explanation: { type: "string" },
              example: { type: "string" }
            },
            required: ["title", "explanation", "example"]
          }
        }
      ]
    }
  }
]

});

async function callGeminiAPI(userPrompt) {
  try {
    // One-shot prompt: provide one example before asking for the new concept
    const oneShotPrompt = `
You are an educational assistant. I will show you **one example** of how to explain a concept simply and clearly.

Example:
Concept: Photosynthesis
Function Call:
{
  "title": "Photosynthesis",
  "explanation": "Photosynthesis is how plants make their own food. They use sunlight, water, and carbon dioxide to create sugars (energy) and oxygen. It's like a plant's kitchen powered by the sun. This process is essential for life on Earth.",
  "example": "A leaf uses sunlight to convert water and air into glucose (sugar) for energy and releases oxygen."
}

Now, using the same format, explain this new concept:

Concept: ${userPrompt}
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: oneShotPrompt }] }]
    });

    const call = result.response.functionCalls?.[0];
    if (call && call.name === "explainTopic") {
      const args = call.args || {};
      return await explainTopic(args);
    }

    // fallback
    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return { raw: text };
  } catch (err) {
    console.error("Error in callGeminiAPI:", err.message);
    throw err;
  }
}

module.exports = { callGeminiAPI };
