import React, { useEffect, useState } from "react";
import styles from "../css/index.module.css";
import "../../../css/index.css";
import { Box, Button } from "@mui/material";
import {
  getEvaluationById,
  updateEvaluation,
} from "../../../services/evaluations";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import EvaluationPDF from "./pdfSheet";

// Define los tipos para los datos de la evaluación
interface Pregunta {
  _id: string;
  categoria: string;
  texto: string;
  puntaje: number;
}

interface PuntajePorCategoria {
  categoria: string;
  puntajeTotal: number;
}

interface EvaluationData {
  preguntas: Pregunta[];
  puntajePorCategoria: PuntajePorCategoria[];
  puntajeTotal: number;
}

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("user") || "este usuario";
  const { id } = useParams<{ id: string }>();
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (id) {
        try {
          const evaluationData = await getEvaluationById({ id });
          setEvaluation(evaluationData);
          console.log(evaluationData);
        } catch (error) {
          console.log("Error fetching evaluation:", error);
        }
      } else {
        console.log("ID es undefined");
      }
    };

    fetchEvaluation();
  }, [id]);

  const handleEditQuestions = () => {
    setIsEditing(true);
  };

  const handleSubmitChanges = async () => {
    if (evaluation) {
      try {
        if (id) {
          const updateParams = {
            id: id,
            data: evaluation.preguntas,
          };

          await updateEvaluation(updateParams);
          navigate(0);
        }
      } catch (error) {
        console.log("Error updating evaluation:", error);
      }
    }
    setIsEditing(false);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (evaluation) {
      // Filtrar la pregunta para eliminarla
      const updatedPreguntas = evaluation.preguntas.filter(
        (pregunta) => pregunta._id !== questionId
      );

      // Actualizar el estado con las preguntas restantes
      setEvaluation({
        ...evaluation,
        preguntas: updatedPreguntas,
      });
    }
  };

  // Función para agrupar preguntas por categoría
  const groupByCategory = (preguntas: Pregunta[]) => {
    return preguntas.reduce(
      (acc: Record<string, Pregunta[]>, pregunta: Pregunta) => {
        if (!acc[pregunta.categoria]) {
          acc[pregunta.categoria] = [];
        }
        acc[pregunta.categoria].push(pregunta);
        return acc;
      },
      {}
    );
  };

  // Agrupar preguntas por categoría si evaluation.preguntas existe
  const groupedQuestions = evaluation?.preguntas
    ? groupByCategory(evaluation.preguntas)
    : {};

  // Crear un mapa de puntajes por categoría para acceso rápido
  const puntajePorCategoriaMap = new Map<string, number>();
  evaluation?.puntajePorCategoria.forEach(({ categoria, puntajeTotal }) => {
    puntajePorCategoriaMap.set(categoria, puntajeTotal);
  });

  return (
    <Box className="container">
      <p className="title">Evaluación</p>
      <Box className={styles.evaluationContainer}>
        <h3>Evaluación</h3>
        <p className={styles.subTitle}>Gestione la evaluación de {name}</p>
        <Box className={styles.optionsEvaluaionBar}>
        {evaluation && (
            <PDFDownloadLink
              document={<EvaluationPDF evaluation={evaluation} name={name} />}
              fileName={`evaluacion-de-${name}.pdf`}
            >
              {({ loading }) => (
                <Button className={styles.buttonToReport}>
                  <p className={styles.textCreate}>
                    {loading ? "Generando PDF..." : "Crear Reporte"}
                  </p>
                </Button>
              )}
            </PDFDownloadLink>
          )}
          <Button
            className={
              !isEditing ? styles.buttonToCreate : styles.buttonToSubmit
            }
            onClick={!isEditing ? handleEditQuestions : handleSubmitChanges}
          >
            <p className={styles.textCreate}>
              {!isEditing ? "Editar Evaluación" : "Completar cambios"}
            </p>
          </Button>
        </Box>
        <Box className={styles.questionsList}>
          {/* Mostrar el puntaje final al principio */}
          {evaluation?.puntajeTotal && (
            <Box className={styles.finalScore}>
              <h1 className={styles.finalScoreText}>
                Puntaje Final:{" "}
                <span className={styles.totalScoreSpan}>
                  <span className={styles.totalScoreSpanNumber}>
                    {evaluation.puntajeTotal}
                  </span>
                  /100
                </span>
              </h1>
            </Box>
          )}
          {Object.entries(groupedQuestions).map(([categoria, preguntas]) => (
            <Box key={categoria} className={styles.categorySection}>
              <h1>
                • Categoría:{" "}
                <span className={styles.question}>{categoria}</span>
              </h1>
              {preguntas.map((pregunta, index) => (
                <Box key={index} className={styles.questionInput}>
                  <Box>
                    <h3>
                      Pregunta:{" "}
                      <span className={styles.question}>{pregunta.texto}</span>
                    </h3>
                    <h3>
                      Evaluación:{" "}
                      <span className={styles.score}>
                        {pregunta.puntaje}
                        <span className={styles.scoreLimit}>/100</span>
                      </span>
                    </h3>
                  </Box>
                  {isEditing && (
                    <Box className={styles.deleteButtonContainer}>
                      <Button
                        className={styles.buttonToDelete}
                        onClick={() => handleDeleteQuestion(pregunta._id)}
                      >
                        <p className={styles.textCreate}>Eliminar</p>
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
              {/* Mostrar el puntaje por categoría debajo de las preguntas de esa categoría */}
              {puntajePorCategoriaMap.has(categoria) && (
                <Box className={styles.categoryScore}>
                  <h2>
                    - Puntaje total de categoría:{" "}
                    <span className={styles.score}>
                      {puntajePorCategoriaMap.get(categoria)}
                      <span className={styles.scoreLimit}>/100</span>
                    </span>
                  </h2>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
