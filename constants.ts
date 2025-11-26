import { Type } from "@google/genai";

// Schema for Plant Identification
export const PLANT_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Common name of the plant" },
    scientificName: { type: Type.STRING, description: "Scientific (Latin) name" },
    description: { type: Type.STRING, description: "A brief, engaging description of the plant." },
    care: {
      type: Type.OBJECT,
      properties: {
        light: { type: Type.STRING, description: "Light requirements" },
        water: { type: Type.STRING, description: "Watering schedule and needs" },
        soil: { type: Type.STRING, description: "Preferred soil type" },
        temperature: { type: Type.STRING, description: "Ideal temperature range" },
        fertilizer: { type: Type.STRING, description: "Fertilization needs" }
      },
      required: ["light", "water", "soil", "temperature", "fertilizer"]
    },
    difficulty: { type: Type.INTEGER, description: "Difficulty level from 1 (Easy) to 10 (Expert)" },
    sunlightNeeds: { type: Type.INTEGER, description: "Sunlight intensity needs from 1 (Shade) to 10 (Direct Sun)" },
    waterNeeds: { type: Type.INTEGER, description: "Water frequency needs from 1 (Dry) to 10 (Wet)" },
    toxicity: { type: Type.STRING, description: "Toxicity information for pets and humans" },
    funFact: { type: Type.STRING, description: "An interesting fact about the plant" }
  },
  required: ["name", "scientificName", "description", "care", "difficulty", "sunlightNeeds", "waterNeeds", "toxicity", "funFact"]
};
