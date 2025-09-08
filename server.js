// server.js
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Image generation endpoint
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const imageUrl = result.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
