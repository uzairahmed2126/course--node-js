import express from "express";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
app.use(cors());
app.use(express.json());

// Required when using ES modules instead of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  const { filename, content } = req.body;

  fs.writeFile(`./files/${filename}`, content, (err) => {
    if (err) return res.status(500).send("Error writing file");
    res.send("✅ File created successfully!");
  });
  fs.appendFileSync(`./files/${filename}`,content)
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
