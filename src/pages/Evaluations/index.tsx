import React from "react";
import styles from "./css/index.module.css";
import "../../css/index.css";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Index = () => {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box className="container">
      <p className="title">Evaluaciones</p>
      <Box className={styles.evaluationContainer}>
        <h3>Evaluaciones</h3>
        <p className={styles.subTitle}>
          Gestione y realice evaluaciones de retroalimentación para sus
          empleados
        </p>
        <Box className={styles.optionsBar}>
          <Box className={styles.searchInputContainer}>
            <SearchOutlinedIcon
              sx={{
                color: "#b8b8b8",
                borderRight: "1.5px solid #e5e7eb",
                paddingRight: "5px",
                paddingLeft: "5px",
                display: "flex",
                alignItems: "center",
              }}
            />
            <input
              type="text"
              name="search-evaluation"
              id="search-evaluation"
              className={styles.searchInput}
              placeholder="Busca un usuario"
            />
          </Box>
          <Box>
            <Button className={styles.buttonToCreate}>
              <p className={styles.textCreate}>Crear Evaluación</p>
            </Button>
          </Box>
        </Box>
        <Box>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton className={styles.listItem}>
                    <ListItemAvatar>
                      <Avatar alt="John" src="#" />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <Box className={styles.viewButton}>
                        <p className={styles.textAction}>Ver</p>
                      </Box>
                      <Box className={styles.editButton}>
                        <p className={styles.textAction}>Editar</p>
                      </Box>
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      <Box className={styles.evaluationContainer}>
        <h3>Categorías de evaluaciones</h3>
        <p className={styles.subTitle}>
          Gestione las categorías utilizadas en sus evaluaciones de feedback.
        </p>
        <Box className={styles.optionsBar}>
          <Box className={styles.searchInputContainer}>
            <SearchOutlinedIcon
              sx={{
                color: "#b8b8b8",
                borderRight: "1.5px solid #e5e7eb",
                paddingRight: "5px",
                paddingLeft: "5px",
                display: "flex",
                alignItems: "center",
              }}
            />
            <input
              type="text"
              name="search-evaluation"
              id="search-evaluation"
              className={styles.searchInput}
              placeholder="Busca una categoría"
            />
          </Box>
          <Box>
            <Button className={styles.buttonToCreate}>
              <p className={styles.textCreate}>Crear Categoría</p>
            </Button>
          </Box>
        </Box>
        <Box>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton className={styles.listItem}>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <Box className={styles.viewButton}>
                        <p className={styles.textAction}>Ver</p>
                      </Box>
                      <Box className={styles.editButton}>
                        <p className={styles.textAction}>Editar</p>
                      </Box>
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      <Box className={styles.evaluationContainer}>
        <h3>Preguntas de evaluaciones</h3>
        <p className={styles.subTitle}>
          Gestione las preguntas utilizadas en sus evaluaciones de
          retroalimentación.
        </p>
        <Box className={styles.optionsBar}>
          <Box className={styles.searchInputContainer}>
            <SearchOutlinedIcon
              sx={{
                color: "#b8b8b8",
                borderRight: "1.5px solid #e5e7eb",
                paddingRight: "5px",
                paddingLeft: "5px",
                display: "flex",
                alignItems: "center",
              }}
            />
            <input
              type="text"
              name="search-evaluation"
              id="search-evaluation"
              className={styles.searchInput}
              placeholder="Busca una pregunta"
            />
          </Box>
          <Box>
            <Button className={styles.buttonToCreate}>
              <p className={styles.textCreate}>Crear pregunta</p>
            </Button>
          </Box>
        </Box>
        <Box>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton className={styles.listItem}>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <Box className={styles.viewButton}>
                        <p className={styles.textAction}>Ver</p>
                      </Box>
                      <Box className={styles.editButton}>
                        <p className={styles.textAction}>Editar</p>
                      </Box>
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
