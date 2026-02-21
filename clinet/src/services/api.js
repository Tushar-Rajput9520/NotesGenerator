import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const getCurentUser = async (dispatch) => {
  try {
    const result = await axios.get(
      serverUrl + "/api/user/currentuser",
      { withCredentials: true }
    );

    console.log("API Response:", result.data);

    // 🔥 Only store user object
    dispatch(setUserData(result.data.user));

  } catch (err) {
    console.log(err);
    dispatch(setUserData(null));
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      { withCredentials: true }
    );

    console.log("Generate API:", result.data);
    return result.data;

  } catch (err) {
    console.error("Generate Error:", err.response?.data || err.message);
    throw err; // 🔥 important
  }
};




export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/pdf/generate-pdf`,
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    // Create PDF Blob
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    // Create temporary URL
    const url = window.URL.createObjectURL(blob);

    // Create anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("PDF Download Failed:", error);
  }
};