"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateText(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "No response generated from the model.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Rate Limit Error Handling (HTTP status 429)
    if (error?.status === 429 || error?.message?.includes("429")) {
      return "⚠️ Rate limit reached (20 requests/min). Please wait about a minute before asking another question.";
    }

    // Invalid API Key / Unauthorized
    if (error?.status === 401 || error?.status === 403) {
      return "⚠️ Invalid API credentials. Please check your process.env.GOOGLE_API_KEY setting.";
    }

    // Generic Fallback Error
    return "⚠️ An unexpected error occurred while communicating with the AI service. Please try again later.";
  }
}