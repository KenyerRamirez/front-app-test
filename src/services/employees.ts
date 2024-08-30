import axios from "axios";

export const getEmployees = async () => {
  try {
    // const authToken = await localStorage.getItem("Access-token");
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQwN2FjNDI4MWFiZjVmNjZiMTMxYzgiLCJub21icmUiOiJLZW55ZXIiLCJpYXQiOjE3MjQ5Mzg5NTcsImV4cCI6MTcyNTU0Mzc1N30.qXdfkGe2L1niu2tWQnlpfD8gdANByHQPU5-ZSu_YXQ4";
    // const role_ID = await AsyncStorage.getItem("Role");
    // const restaurant_ID = await AsyncStorage.getItem("Restaurant");
    // if (authToken !== null && role_ID !== null && restaurant_ID !== null) {
    const evaluationsData = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/employees/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return evaluationsData.data.data;
    // } else {
    //   throw error;
    // }
  } catch (error) {
    throw error;
  }
};