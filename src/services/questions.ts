import axios from "axios";

export const getQuestions = async () => {
  try {
    const authToken = await localStorage.getItem("Access-token");
    const evaluarionsData = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/questions/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return evaluarionsData.data.data;
  } catch (error) {
    throw error;
  }
};
