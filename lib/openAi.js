import OpenAI from "openai";

// Automatically looks for process.env.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;