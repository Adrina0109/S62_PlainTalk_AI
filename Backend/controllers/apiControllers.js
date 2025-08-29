// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const getData = (req, res) => {
//   res.json({
//     message: "GET request successful 🚀",
//     data: { name: "Adrina", project: "AI + Backend Demo" },
//   });
// };

// const postData = (req, res) => {
//   const { input } = req.body;
//   res.json({
//     message: "POST request successful 🚀",
//     received: input,
//   });
// };

// const aiTask = async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();

//     res.json({
//       message: "AI Task successful 🚀",
//       prompt,
//       response: responseText,
//     });
//   } catch (error) {
//     console.error("AI Task Error:", error);
//     res.status(500).json({ error: "AI Task failed ❌" });
//   }
// };

// export { getData, postData, aiTask };
