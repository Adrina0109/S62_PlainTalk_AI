const express = require("express");
const bodyParser = require("body-parser");
const aiRoutes = require("./routes/apiRoutes"); // adjust path if needed

const app = express();
app.use(bodyParser.json());

// mount your routes
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
