import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY); 
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export const getChatResponse = async (message) => {
  try {
    const result = await model.generateContent(message);
    const response = await result.response.text();
    return response;
  } catch (error) {
    console.error("Error fetching response from Gemini AI:", error);
    return "Error fetching response from AI.";
  }
};
