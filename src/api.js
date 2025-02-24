import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY); // Replace with your API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log("API Key:", API_KEY);

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
