import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

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

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  indexContainer: {
    fontSize: 14,
    marginBottom: 30,
    color: "#8b8b8b",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  finalScore: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  totalScoreSpan: {
    fontWeight: "bold",
    color: "#80aee4",
  },
  totalScore: {
    fontWeight: "bold",
  },
  categorySection: {
    marginBottom: 20,
  },
  questionInput: {
    marginBottom: 10,
  },
  categoryTitle: {
    marginBottom: 20,
    fontSize: 25,
  },
  questionTitle: {
    marginBottom: 10,
  },
  question: {
    fontWeight: "light",
  },
  scoreTitle: {
    fontWeight: "light",
    marginLeft: 20,
  },
  score: {
    color: "#80aee4",
  },
  scoreLimit: {
    fontSize: 12,
    color: "black",
  },
  categoryScore: {
    marginTop: 10,
    fontStyle: "italic",
    marginBottom: 50,
  },
});

const EvaluationPDF: React.FC<{ evaluation: EvaluationData; name: string }> = ({
  evaluation,
  name,
}) => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
  const formattedDate = formatter.format(date);

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

  const groupedQuestions = groupByCategory(evaluation.preguntas);
  const puntajePorCategoriaMap = new Map<string, number>();
  evaluation.puntajePorCategoria.forEach(({ categoria, puntajeTotal }) => {
    puntajePorCategoriaMap.set(categoria, puntajeTotal);
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <View style={styles.indexContainer}>
            <Text>Fecha de reporte: {formattedDate.toString()}.</Text>
            <Text>Usuario evaluado: {name}.</Text>
          </View>
          {evaluation.puntajeTotal && (
            <Text style={styles.finalScore}>
              Puntaje Final:{" "}
              <Text style={styles.totalScore}>
                <Text style={styles.totalScoreSpan}>
                  {evaluation.puntajeTotal}
                </Text>
                /100
              </Text>
            </Text>
          )}
          {Object.entries(groupedQuestions).map(([categoria, preguntas]) => (
            <View key={categoria} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>
                • Categoría: <Text style={styles.question}>{categoria}</Text>
              </Text>
              {preguntas.map((pregunta, index) => (
                <View key={index} style={styles.questionInput}>
                  <Text style={styles.questionTitle}>
                    Pregunta:{" "}
                    <Text style={styles.question}>{pregunta.texto}</Text>
                  </Text>
                  <Text style={styles.scoreTitle}>
                    Evaluación:{" "}
                    <Text style={styles.score}>
                      {pregunta.puntaje}
                      <Text style={styles.scoreLimit}>/100</Text>
                    </Text>
                  </Text>
                </View>
              ))}
              {puntajePorCategoriaMap.has(categoria) && (
                <Text style={styles.categoryScore}>
                  - Puntaje total de categoría:{" "}
                  <Text>
                    <Text style={styles.score}>
                      {puntajePorCategoriaMap.get(categoria)}
                    </Text>
                    /100
                  </Text>
                </Text>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default EvaluationPDF;
