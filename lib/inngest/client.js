import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "sensei", // Unique app ID [career-coach]
  name: "Sensei", 
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
