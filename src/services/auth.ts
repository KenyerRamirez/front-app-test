import axios from "axios";
import { jwtVerify } from "jose";

export const loginUsers = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        nombre: username,
        contrasena: password,
      }
    );
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export const registerUsers = async (
  username: string,
  password: string,
  jobPosition: string,
  role: string
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {
        nombre: username,
        contrasena: password,
        puestoTrabajo: jobPosition,
        rol: role,
      }
    );
    const login = await loginUsers(username, password);
    return login;
  } catch (error) {
    throw error;
  }
};

export const getUserIdByToken = async () => {
  const token = await localStorage.getItem("Access-token");

  if (!token) {
    console.log("No token found");
    return null;
  }
  const secret = new TextEncoder().encode(process.env.REACT_APP_SECRET_KEY);

  const { payload } = await jwtVerify(token, secret);
  return payload.sub;
};
