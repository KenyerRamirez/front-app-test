import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/index.module.css";
import { registerUsers } from "../../services/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (name === "" || password === "" || role === "" || position === "") {
        setError("Por favor, completa todos los campos.");
      } else {
        const data = await registerUsers(name, password, position, role);
        localStorage.setItem("Access-token", data);
        navigate("/");
      }
    } catch (error) {
      setError("Error al registrar el usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={styles.RegisterContainer}>
        <Box className={styles.loginForm}>
          <Typography component="h1" variant="h5" className={styles.loginTitle}>
            Registro
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
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
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="role-label" className={styles.textFieldLabel}>
                Rol
              </InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Rol"
                className={styles.textField}
                MenuProps={{
                  PaperProps: {
                    style: {
                      borderColor: "#e5e7eb",
                    },
                  },
                }}
                // InputLabelProps={{ className: styles.textFieldLabel }}
                inputProps={{ className: styles.textFieldInput }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="position"
              label="Puesto de Trabajo"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={styles.textField}
              InputLabelProps={{ className: styles.textFieldLabel }}
              InputProps={{ className: styles.textFieldInput }}
            />
            {error !== null && (
              <Box>
                <p className={styles.incorrectData}>{error}</p>
              </Box>
            )}
            <Button
              fullWidth
              variant="contained"
              className={styles.submitButton}
              onClick={handleSubmit}
            >
              Registrar
            </Button>
            <Link to="/login">¿Tienes cuenta? Inicia sesión.</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
