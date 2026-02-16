import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_ID, SYSTEM_INSTRUCTION } from '../constants';
import { Resident } from '../types';

// Initialize Gemini Client
// Assumption: process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateResponse = async (
  prompt: string,
  residents: Resident[]
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key tidak ditemukan. Pastikan process.env.API_KEY telah diatur.";
  }

  try {
    // We provide the current resident data as context for the model
    // to perform RAG-like operations on the client side for this small dataset.
    const residentsContext = JSON.stringify(residents);
    const fullPrompt = `
      Data Warga Saat Ini (JSON):
      ${residentsContext}

      Pertanyaan/Perintah User:
      ${prompt}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_ID,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Maaf, saya tidak dapat menghasilkan respons saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten pintar. Silakan coba lagi nanti.";
  }
};
