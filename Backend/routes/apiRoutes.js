const express = require("express");
const { callGeminiAPI } = require("../ai/aiTasks");
const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await callGeminiAPI(prompt);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
