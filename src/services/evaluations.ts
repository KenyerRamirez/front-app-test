import axios from "axios";

export const getEvaluations = async () => {
  try {
    const authToken = await localStorage.getItem("Access-token");
    const evaluationsData = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/evaluations/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return evaluationsData.data.data;
  } catch (error) {
    throw error;
  }
};

interface GetEvaluationByIdParams {
  id: string;
}

export const getEvaluationById = async ({ id }: GetEvaluationByIdParams) => {
  try {
    const authToken = await localStorage.getItem("Access-token");
    const evaluationData = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/evaluations/${id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return evaluationData.data.data;
  } catch (error) {
    throw error;
  }
};

export const createEvaluation = async (data: any) => {
  console.log("la data", data);
  try {
    const authToken = await localStorage.getItem("Access-token");
    const evaluationData = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/evaluations/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        tipoEvaluación: data.tipoEvaluación,
        usuarioEvaluado: data.usuarioEvaluado,
        evaluador: data.evaluador,
        preguntas: data.preguntas,
      },
    });
    return evaluationData.data.data;
  } catch (error) {
    throw error;
  }
};

interface Pregunta {
  _id: string;
  categoria: string;
  texto: string;
  puntaje: number;
}

interface UpdateEvaluationParams {
  id: string;
  data: Pregunta[];
}

export const updateEvaluation = async ({
  id,
  data,
}: UpdateEvaluationParams) => {
  try {
    const authToken = await localStorage.getItem("Access-token");
    const evaluationData = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/evaluations/${id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: { preguntas: data },
    });

    return evaluationData.data.data;
  } catch (error) {
    throw error;
  }
};
