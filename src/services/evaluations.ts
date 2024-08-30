import axios from "axios";

export const getEvaluations = async () => {
  try {
    // const authToken = await localStorage.getItem("Access-token");
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQwN2FjNDI4MWFiZjVmNjZiMTMxYzgiLCJub21icmUiOiJLZW55ZXIiLCJpYXQiOjE3MjQ5Mzg5NTcsImV4cCI6MTcyNTU0Mzc1N30.qXdfkGe2L1niu2tWQnlpfD8gdANByHQPU5-ZSu_YXQ4";
    // const role_ID = await AsyncStorage.getItem("Role");
    // const restaurant_ID = await AsyncStorage.getItem("Restaurant");
    // if (authToken !== null && role_ID !== null && restaurant_ID !== null) {
    const evaluationsData = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/evaluations/`,
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

interface GetEvaluationByIdParams {
  id: string;
}

export const getEvaluationById = async ({ id }: GetEvaluationByIdParams) => {
  try {
    // const authToken = await localStorage.getItem("Access-token");
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQwN2FjNDI4MWFiZjVmNjZiMTMxYzgiLCJub21icmUiOiJLZW55ZXIiLCJpYXQiOjE3MjQ5Mzg5NTcsImV4cCI6MTcyNTU0Mzc1N30.qXdfkGe2L1niu2tWQnlpfD8gdANByHQPU5-ZSu_YXQ4";
    // const role_ID = await AsyncStorage.getItem("Role");
    // const restaurant_ID = await AsyncStorage.getItem("Restaurant");
    // if (authToken !== null && role_ID !== null && restaurant_ID !== null) {
    const evaluationData = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/evaluations/${id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return evaluationData.data.data;
    // } else {
    //   throw error;
    // }
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
    // const authToken = await localStorage.getItem("Access-token");
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQwN2FjNDI4MWFiZjVmNjZiMTMxYzgiLCJub21icmUiOiJLZW55ZXIiLCJpYXQiOjE3MjQ5Mzg5NTcsImV4cCI6MTcyNTU0Mzc1N30.qXdfkGe2L1niu2tWQnlpfD8gdANByHQPU5-ZSu_YXQ4";
    // const role_ID = await AsyncStorage.getItem("Role");
    // const restaurant_ID = await AsyncStorage.getItem("Restaurant");
    // if (authToken !== null && role_ID !== null && restaurant_ID !== null) {
    const evaluationData = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/evaluations/${id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: { preguntas: data },
    });

    return evaluationData.data.data;
    // } else {
    //   throw error;
    // }
  } catch (error) {
    throw error;
  }
};

const data = {
  id: "66d0ba1696788fd93a13f7a0",
  data: [
    {
      texto: "¿Cómo evaluas la capacidad del empleado para resolver problemas?",
      categoria: "Desempeño Laboral",
      puntaje: 100,
      _id: "66d0ba1696788fd93a13f7a3",
    },
    {
      texto:
        "¿Cómo calificarías la claridad y efectividad de la comunicación del empleado?",
      categoria: "Habilidades de Comunicación",
      puntaje: 70,
      _id: "66d0ba1696788fd93a13f7a4",
    },
    {
      texto: "¿El empleado escucha activamente a los demás?",
      categoria: "Habilidades de Comunicación",
      puntaje: 50,
      _id: "66d0ba1696788fd93a13f7a5",
    },
    {
      texto:
        "¿Cómo evalúas la habilidad del empleado para dar y recibir retroalimentación constructiva?",
      categoria: "Habilidades de Comunicación",
      puntaje: 90,
      _id: "66d0ba1696788fd93a13f7a6",
    },
    {
      texto:
        "¿Cómo calificarías la capacidad del empleado para priorizar tareas?",
      categoria: "Gestión del Tiempo",
      puntaje: 60,
      _id: "66d0ba1696788fd93a13f7a7",
    },
    {
      texto: "¿El empleado es eficiente en la gestión de su tiempo?",
      categoria: "Gestión del Tiempo",
      puntaje: 80,
      _id: "66d0ba1696788fd93a13f7a8",
    },
    {
      texto:
        "¿Cómo evaluas la puntualidad del empleado en la entrega de proyectos?",
      categoria: "Gestión del Tiempo",
      puntaje: 70,
      _id: "66d0ba1696788fd93a13f7a9",
    },
    {
      texto:
        "¿Cómo calificarías la colaboración del empleado con sus compañeros de equipo?",
      categoria: "Trabajo en Equipo",
      puntaje: 85,
      _id: "66d0ba1696788fd93a13f7aa",
    },
    {
      texto: "¿El empleado contribuye positivamente a la dinámica de grupo?",
      categoria: "Trabajo en Equipo",
      puntaje: 75,
      _id: "66d0ba1696788fd93a13f7ab",
    },
    {
      texto:
        "¿Cómo evalúas la disposición del empleado para ayudar a otros miembros del equipo?",
      categoria: "Trabajo en Equipo",
      puntaje: 90,
      _id: "66d0ba1696788fd93a13f7ac",
    },
    {
      texto:
        "¿Cómo calificarías la capacidad del empleado para generar nuevas ideas?",
      categoria: "Innovación y Creatividad",
      puntaje: 80,
      _id: "66d0ba1696788fd93a13f7ad",
    },
    {
      texto: "¿El empleado busca formas creativas de resolver problemas?",
      categoria: "Innovación y Creatividad",
      puntaje: 70,
      _id: "66d0ba1696788fd93a13f7ae",
    },
    {
      texto:
        "¿Cómo evaluas la implementación de ideas innovadoras por parte del empleado?",
      categoria: "Innovación y Creatividad",
      puntaje: 90,
      _id: "66d0ba1696788fd93a13f7af",
    },
    {
      texto:
        "¿Cómo calificarías tu rendimiento general en el último período de evaluación?",
      categoria: "Desempeño General",
      puntaje: 85,
      _id: "66d0ba1696788fd93a13f7b0",
    },
    {
      texto: "¿Qué logros consideras que has tenido durante este período?",
      categoria: "Desempeño General",
      puntaje: 80,
      _id: "66d0ba1696788fd93a13f7b1",
    },
    {
      texto: "¿Qué desafíos has enfrentado y cómo los has superado?",
      categoria: "Desempeño General",
      puntaje: 70,
      _id: "66d0ba1696788fd93a13f7b2",
    },
    {
      texto:
        "¿Cómo evaluas tu habilidad para cumplir con los objetivos y metas establecidas?",
      categoria: "Habilidades y Competencias",
      puntaje: 75,
      _id: "66d0ba1696788fd93a13f7b3",
    },
    {
      texto:
        "¿En qué áreas crees que necesitas mejorar para ser más efectivo en tu rol?",
      categoria: "Habilidades y Competencias",
      puntaje: 60,
      _id: "66d0ba1696788fd93a13f7b4",
    },
    {
      texto:
        "¿Qué habilidades nuevas has adquirido o desarrollado recientemente?",
      categoria: "Habilidades y Competencias",
      puntaje: 70,
      _id: "66d0ba1696788fd93a13f7b5",
    },
    {
      texto:
        "¿Cómo calificarías tu capacidad para gestionar tu tiempo de manera efectiva?",
      categoria: "Gestión del Tiempo y Productividad",
      puntaje: 80,
      _id: "66d0ba1696788fd93a13f7b6",
    },
    {
      texto: "¿Qué estrategias utilizas para organizar y priorizar tus tareas?",
      categoria: "Gestión del Tiempo y Productividad",
      puntaje: 70,
      _id: "66d0ba1696788fd93a13f7b7",
    },
    {
      texto: "¿Cómo manejas las interrupciones y cambios en las prioridades?",
      categoria: "Gestión del Tiempo y Productividad",
      puntaje: 90,
      _id: "66d0ba1696788fd93a13f7b8",
    },
    {
      texto: "¿Cómo evaluas tu colaboración con tus compañeros de equipo?",
      categoria: "Trabajo en Equipo y Comunicación",
      puntaje: 75,
      _id: "66d0ba1696788fd93a13f7b9",
    },
    {
      texto:
        "¿Qué tan efectiva consideras que es tu comunicación con el equipo y otros departamentos?",
      categoria: "Trabajo en Equipo y Comunicación",
      puntaje: 80,
      _id: "66d0ba1696788fd93a13f7ba",
    },
    {
      texto:
        "¿Qué acciones has tomado para mejorar tu comunicación y colaboración?",
      categoria: "Trabajo en Equipo y Comunicación",
      puntaje: 85,
      _id: "66d0ba1696788fd93a13f7bb",
    },
    {
      texto:
        "¿Cómo calificarías tu capacidad para proponer ideas nuevas y soluciones creativas?",
      categoria: "Innovación y Desarrollo Personal",
      puntaje: 80,
      _id: "66d0ba1696788fd93a13f7bc",
    },
    {
      texto: "¿Qué pasos has tomado para tu desarrollo profesional y personal?",
      categoria: "Innovación y Desarrollo Personal",
      puntaje: 70,
      _id: "66d0ba1696788fd93a13f7bd",
    },
    {
      texto:
        "¿Qué metas te has propuesto para tu crecimiento y cómo planeas alcanzarlas?",
      categoria: "Innovación y Desarrollo Personal",
      puntaje: 90,
      _id: "66d0ba1696788fd93a13f7be",
    },
  ],
};
