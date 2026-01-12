
import { GoogleGenAI, Type } from "@google/genai";
import { AIConversionResponse } from "../types";

export const getSmartConversion = async (query: string): Promise<AIConversionResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Convert or explain this unit request: "${query}". Provide a precise numeric result if possible, an explanation of the conversion, and a fun fact about the units involved.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          result: {
            type: Type.STRING,
            description: "The numeric or primary result of the conversion.",
          },
          explanation: {
            type: Type.STRING,
            description: "A brief explanation of how the conversion was calculated.",
          },
          funFact: {
            type: Type.STRING,
            description: "An interesting fact about the units used.",
          },
        },
        required: ["result", "explanation", "funFact"],
      },
    },
  });

  return JSON.parse(response.text || '{}') as AIConversionResponse;
};
