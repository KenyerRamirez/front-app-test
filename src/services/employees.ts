import axios from "axios";

export const getEmployees = async () => {
  try {
    const authToken = await localStorage.getItem("Access-token");
    const evaluationsData = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/employees/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return evaluationsData.data.data;
  } catch (error) {
    throw error;
  }
};
