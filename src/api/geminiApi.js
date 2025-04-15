import axios from "axios";

const GEMINI_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const generateGeminiResponse = async (userPrompt) => {
  if (!userPrompt) {
    console.error("No user prompt provided");
    return;
  }

  try {
    const response = await axios.post(
      `${GEMINI_ENDPOINT}?key=${GEMINI_KEY}`,
      {
        contents: [{ parts: [{ text: userPrompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Assuming the response follows this structure, you might need to adjust it
    const output =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return output;
  } catch (error) {
    console.error(
      "Error while calling Gemini API:",
      error.response || error.message
    );
    throw new Error("Failed to get response from Gemini.");
  }
};
