import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBJyrreTcfnv8vcpASjDtHzz1b48zdJDL8"); // Replace with your API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
