import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import { createEvaluation } from "../../services/evaluations";
import { Link } from "react-router-dom";

interface UserData {
  _id: string;
  nombre: string;
  puestoTrabajo: string;
}

interface QuestionAnswered {
  texto: string;
  categoria: string;
  puntaje: number;
}

interface SubmitEvaluationProps {
  tipoEvaluación: string;
  usuarioEvaluado: string;
  evaluador: string;
  preguntas: QuestionAnswered[];
}

interface CreateEvaluationFormProps {
  questions: any[];
  userSelected: UserData;
  evaluation_type: string;
}

const CreateEvaluationForm: React.FC<CreateEvaluationFormProps> = ({
  questions,
  userSelected,
  evaluation_type,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswered[]>([]);
  const [value, setValue] = useState<number | null>(null);
  const [evaluation, setEvaluation] = useState<SubmitEvaluationProps | null>(
    null
  );
  const allQuestions = questions.filter(
    (item) => item.tipoEvaluacion === evaluation_type
  );

  const ENDING_CONDITIONAL = currentQuestionIndex + 1 === allQuestions.length;

  const handleRating = (newValue: number | null) => {
    setValue(newValue);
  };

  const handleConfirm = () => {
    if (value !== null) {
      const score = value * 20; // Convert star rating to score (1-5 stars to 20-100)

      // Save the answer
      setAnswers((prev) => [
        ...prev,
        {
          texto: questions[currentQuestionIndex].pregunta,
          categoria: questions[currentQuestionIndex].categoria,
          puntaje: score,
        },
      ]);

      // Move to next question or end
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setValue(null); // Reset rating for next question
      }
    }
  };

  const handleSubmitEvaluation = async () => {
    const data = {
      tipoEvaluación: evaluation_type,
      usuarioEvaluado: userSelected?._id,
      evaluador: "66d07c5e1a7a41a5f59475a2",
      preguntas: answers,
    };
    setEvaluation(data);
    try {
      await createEvaluation(data);
    } catch (error) {
      console.log("Was an error trying to create evaluation:", error);
    }
  };

  const renderQuestion = () => {
    if (currentQuestionIndex >= allQuestions.length) {
      return renderSummary();
    }

    const question = allQuestions[currentQuestionIndex];
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
          {question.categoria}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mb: 5 }}>
          Pregunta {currentQuestionIndex + 1} de {allQuestions.length}
        </Typography>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          {question.pregunta}
        </Typography>
        <Rating
          name={`question-${question.id}-rating`}
          value={value}
          onChange={(event, newValue) => handleRating(newValue)}
          size="large"
        />
        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 5, color: "text.secondary" }}
        >
          Selecciona una opción
        </Typography>
        {ENDING_CONDITIONAL ? (
          <Link to={"/evaluations"}>
            <Button
              variant="contained"
              color="success"
              disabled={value === null}
              onClick={handleSubmitEvaluation}
              sx={{ mb: 5 }}
            >
              Confirmar y terminar
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            color="primary"
            disabled={value === null}
            onClick={handleConfirm}
            sx={{ mb: 5 }}
          >
            Confirmar y continuar
          </Button>
        )}
      </Box>
    );
  };

  const renderSummary = () => {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Evaluation Summary
        </Typography>
        {answers.map((answer, index) => (
          <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Question {index + 1}</Typography>
            <Typography>{questions[index].pregunta}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Your rating: {answer.puntaje} points
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  };

  return <Box sx={{ maxWidth: 600, mx: "auto" }}>{renderQuestion()}</Box>;
};

export default CreateEvaluationForm;
