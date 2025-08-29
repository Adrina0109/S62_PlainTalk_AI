const express = require("express");
const router = express.Router();
const { callGeminiAPI } = require("../ai/aiTasks");

// POST /api/gemini
router.post("/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const responseText = await callGeminiAPI(prompt);
    res.json({ response: responseText });
  } catch (err) {
    console.error("❌ Router Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
