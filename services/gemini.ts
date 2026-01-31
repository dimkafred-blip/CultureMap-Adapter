
import { GoogleGenAI, Type } from "@google/genai";
import { TargetCulture, TransformationResult, AppMode } from "../types";
import { CULTURE_PROFILES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function processRequest(
  text: string, 
  target: TargetCulture, 
  mode: AppMode
): Promise<TransformationResult> {
  const profile = CULTURE_PROFILES[target];
  
  const systemInstruction = mode === 'adapt' 
    ? `
    You are an expert cross-cultural communication consultant trained in Erin Meyer's 'The Culture Map' framework.
    Your goal is to rewrite English text to better fit the mentality of a specific target culture.
    
    Target Culture: ${target}
    Cultural Profile Summary: ${profile.summary}
    Key Scales for ${target}:
    - Communicating: ${profile.communicating}
    - Evaluating: ${profile.evaluating}
    - Persuading: ${profile.persuading}
    - Leading: ${profile.leading}
    - Deciding: ${profile.deciding}
    - Trusting: ${profile.trusting}
    - Disagreeing: ${profile.disagreeing}
    - Scheduling: ${profile.scheduling}
    
    Instructions:
    1. Analyze the original text for potential cultural clashes with the target culture.
    2. Rewrite the text while maintaining the core message but adjusting the tone, structure, and directness.
    3. Provide a list of specific changes based on the 8 scales.
    `
    : `
    You are an expert cultural consultant specializing in ${target} culture, using the framework from Erin Meyer's 'The Culture Map'.
    The user will ask you a question or provide a scenario regarding ${target}.
    
    Target Culture Context: ${profile.summary}
    Scales: ${JSON.stringify(profile)}
    
    Instructions:
    1. Answer the question deeply using the Culture Map framework.
    2. Suggest specific strategies for success in this culture.
    3. Map your answer to the relevant 8 scales.
    `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      adaptedText: { 
        type: Type.STRING, 
        description: mode === 'adapt' ? "The rewritten text." : "The detailed answer to the question." 
      },
      explanation: { type: Type.STRING },
      analysis: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            scale: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["scale", "description"]
        }
      }
    },
    required: ["adaptedText", "explanation", "analysis"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: mode === 'adapt' ? `Original text: "${text}"` : `Question: "${text}"`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  const rawJson = JSON.parse(response.text);
  
  return {
    originalText: text,
    adaptedText: rawJson.adaptedText,
    explanation: rawJson.explanation,
    analysis: rawJson.analysis,
    target,
    mode
  };
}
