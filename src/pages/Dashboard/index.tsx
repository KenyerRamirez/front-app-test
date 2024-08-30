import { Box, Button, Grid2 } from "@mui/material";
import React from "react";
import styles from "./css/index.module.css";
import "../../css/index.css";

const Index = () => {
  return (
    <Box className="container">
      <p className="title">Dashboard</p>
      <Box>
        <Grid2 container spacing={2} className={styles.gridContainer}>
          <Grid2 className={styles.gridItem} size={4}>
            <p className={styles.gridTitle}>Evaluaciones</p>
            <p className={styles.gridDescription}>
              Una vista 360 de las evaluaciones.
            </p>
            <Grid2 container spacing={12}>
              <Grid2 size={6}>
                <p className={styles.gridTitle}>125</p>
                <p className={styles.gridDescription}>Completadas</p>
              </Grid2>
              <Grid2 size={6}>
                <p className={styles.gridTitle}>25</p>
                <p className={styles.gridDescription}>Pendientes</p>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={6}>
              <Grid2 size={6}>
                <p className={styles.gridTitle}>85%</p>
                <p className={styles.gridDescription}>Taza de participación</p>
              </Grid2>
              <Grid2 size={6}>
                <p className={styles.gridTitle}>4.5</p>
                <p className={styles.gridDescription}>Rendimiento</p>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 className={styles.gridItem} size={4}>
            <p className={styles.gridTitle}>Los 3 mejores resultados</p>
            <p className={styles.gridDescription}>
              Mira a los 3 empleados con mejores evaluaciones.
            </p>
            <Box>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <Box>
                    <p className={styles.statName}>John Doe</p>
                    <p className={styles.statProfession}>Software Engineer</p>
                  </Box>
                </Grid2>
                <Grid2 size={6}>
                  <Box className={styles.statsContainer}>
                    <Box>
                      <p className={styles.statNumber}>93%</p>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        height: "5px",
                        borderRadius: 2,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#80aee4",
                          height: "5px",
                          width: "93%",
                          borderRadius: 2,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <Box>
                    <p className={styles.statName}>Mariah Sanchez</p>
                    <p className={styles.statProfession}>UI/UX Designer</p>
                  </Box>
                </Grid2>
                <Grid2 size={6}>
                  <Box className={styles.statsContainer}>
                    <Box>
                      <p className={styles.statNumber}>82%</p>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        height: "5px",
                        borderRadius: 2,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#80aee4",
                          height: "5px",
                          width: "82%",
                          borderRadius: 2,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <Box>
                    <p className={styles.statName}>Miguel Ramirez</p>
                    <p className={styles.statProfession}>Project Manager</p>
                  </Box>
                </Grid2>
                <Grid2 size={6}>
                  <Box className={styles.statsContainer}>
                    <Box>
                      <p className={styles.statNumber}>75%</p>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        height: "5px",
                        borderRadius: 2,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#80aee4",
                          height: "5px",
                          width: "75%",
                          borderRadius: 2,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 className={styles.gridItem} size={4}>
            <p className={styles.gridTitle}>Evaluaciones prontas</p>
            <p className={styles.gridDescription}>
              Una lista de las evaluaciones por venir.
            </p>
            <Box>
              <Grid2 container spacing={2}>
                <Grid2 size={8}>
                  <Box>
                    <p className={styles.statName}>John Doe</p>
                    <p className={styles.statProfession}>
                      Evaluación en 3 días
                    </p>
                  </Box>
                </Grid2>
                <Grid2 size={4}>
                  <Box className={styles.reminderContainer}>
                    <Button className={styles.reminderButton}>
                      <p className={styles.reminderText}>Recordar</p>
                    </Button>
                  </Box>
                </Grid2>
              </Grid2>
              <Grid2 container spacing={2}>
                <Grid2 size={8}>
                  <Box>
                    <p className={styles.statName}>Jack Smith</p>
                    <p className={styles.statProfession}>
                      Evaluación en 6 días
                    </p>
                  </Box>
                </Grid2>
                <Grid2 size={4}>
                  <Box className={styles.reminderContainer}>
                    <Button className={styles.reminderButton}>
                      <p className={styles.reminderText}>Recordar</p>
                    </Button>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Index;
