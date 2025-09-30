import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function openAi_Api(text) {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "system",
       content: `You are an AI assistant that analyzes Terms & Conditions.

Rules:
- Output ONLY valid JSON (no markdown, no comments, no extra text).
- JSON format:
{
  "props": ["short positive point 1", "short positive point 2"],
  "cons": ["short negative point 1", "short negative point 2"],
  "tags": ["privacy", "refunds", "liability"],
  "score": 0-100
}
- Props = strengths or fair points (2–4 max, each under 15 words).
- Cons = risks, unclear points, or strict terms (2–4 max, each under 15 words).
- Tags = 2–5 high-level categories related to cons.
- Score = estimated fairness % (higher means more user-friendly).
- Keep all text short, plain, and user-friendly.
- Never explain, never add extra text, just valid JSON.`

      },
      {
        role: "user",
        content: text
      }
    ]
  });

  const raw = response.output_text;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("❌ Invalid JSON from model:", raw);
    throw new Error("Model did not return valid JSON");
  }

  const normalized = {
    props: parsed.props || parsed.Props || [],
    cons: parsed.cons || parsed.Cons || [],
    tags: parsed.tags || parsed.Tags || []
  };

  return normalized;
}



export default openAi_Api;
