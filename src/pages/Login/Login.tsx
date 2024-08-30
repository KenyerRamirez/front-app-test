import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/index.module.css"; // Asegúrate de ajustar la ruta según sea necesario
import { loginUsers } from "../../services/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectData, setincorrectData] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (name === "" && password === "") {
        setincorrectData("Ingresa los datos");
      } else {
        const data = await loginUsers(name, password);
        setincorrectData(null);
        localStorage.setItem("Access-token", data);
        navigate("/");
      }
    } catch (error: any) {
      if (error.status === 401) {
        setincorrectData("Contraseña incorrecta");
      }
      if (error.status === 404) {
        setincorrectData("No se encontró el usuario");
      }
      console.log("error", error.status);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={styles.loginContainer}>
        <Box className={styles.loginForm}>
          <Typography component="h1" variant="h5" className={styles.loginTitle}>
            Iniciar sesión
          </Typography>
          <Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Correo electrónico"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.textField}
              InputLabelProps={{ className: styles.textFieldLabel }}
              InputProps={{ className: styles.textFieldInput }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.textField}
              InputLabelProps={{ className: styles.textFieldLabel }}
              InputProps={{ className: styles.textFieldInput }}
            />
            {incorrectData !== null && (
              <Box>
                <p className={styles.incorrectData}>{incorrectData}</p>
              </Box>
            )}
            <Button
              fullWidth
              variant="contained"
              className={styles.submitButton}
              onClick={handleSubmit}
            >
              Iniciar sesión
            </Button>
            <Link to="/register">¿No tienes cuenta? Regístrate acá.</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
