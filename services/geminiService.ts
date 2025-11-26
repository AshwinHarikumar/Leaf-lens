import { GoogleGenAI, Type } from "@google/genai";
import { PlantData } from "../types";
import { PLANT_RESPONSE_SCHEMA } from "../constants";

// Initialize Gemini Client
// NOTE: In a real production app, you'd proxy this through a backend.
// For this demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePlantImage = async (base64Image: string): Promise<PlantData> => {
  try {
    // Remove header if present (data:image/jpeg;base64,)
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: "Analyze this image. Identify the plant and provide detailed care instructions, scientific details, and rating metrics."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: PLANT_RESPONSE_SCHEMA,
      }
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini");
    }

    const plantData = JSON.parse(response.text) as PlantData;
    return plantData;

  } catch (error) {
    console.error("Error analyzing plant:", error);
    throw error;
  }
};

export const createChatSession = (plantContext: PlantData) => {
  const systemInstruction = `
    You are LeafLens, an expert botanist and gardening assistant.
    The user is currently viewing details for a plant identified as: ${plantContext.name} (${plantContext.scientificName}).
    
    Here is the context we have on this plant:
    Description: ${plantContext.description}
    Care: ${JSON.stringify(plantContext.care)}
    Difficulty: ${plantContext.difficulty}/10
    
    Answer the user's follow-up questions about this specific plant or general gardening advice.
    Keep answers concise, encouraging, and helpful.
    Format your response in Markdown.
  `;

  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: systemInstruction,
    }
  });
};
