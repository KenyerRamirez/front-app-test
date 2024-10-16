import React, { useEffect, useState } from "react";
import styles from "../css/index.module.css";
import "../../../css/index.css";
import {
  Avatar,
  Box,
  Button,
  Modal,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import ButtonGoBack from "../../../components/ButtonGoBack";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getEmployees } from "../../../services/employees";
import { getQuestions } from "../../../services/questions";
import CreateEvaluationForm from "../../../components/CreateEvaluationForm/CreateEvaluationForm";
import CancelIcon from "@mui/icons-material/Cancel";

interface UserData {
  _id: string;
  nombre: string;
  puestoTrabajo: string;
}

interface QuestionsData {
  _id: string;
  categoria: string;
  pregunta: string;
  tipoEvaluacion: string;
}

const Index = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionsData[]>([]);
  const [userSelected, setUserSelected] = useState<UserData | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleCancelEvaluation = () => {
    setUserSelected(null);
    handleCloseModal();
  };

  const TYPE_EVALUATION = "Evaluación";

  useEffect(() => {
    const fetchUsersAndQuestions = async () => {
      try {
        const dataEmployees = await getEmployees();
        const dataQuestions = await getQuestions();
        setUserData(dataEmployees);
        setQuestions(dataQuestions);
      } catch (error) {
        console.log("Error fetching evaluation:", error);
      }
    };

    fetchUsersAndQuestions();
  }, []);

  const onSelectUser = (user: UserData) => {
    setUserSelected(user);
    const id = localStorage.getItem("UserID-Logged");
    console.log(id);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    const nameParts = name.split(" ");
    const hasLastName = nameParts.length > 1;

    const letters = hasLastName
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}`;

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: letters.toUpperCase(),
    };
  }

  const filteredResults = userData.filter((item) =>
    item.nombre.toLowerCase().includes(searchUser.toLowerCase())
  );

  const usersOrdered = () => {
    return filteredResults
      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map((item, index) => (
        <Box
          onClick={() => onSelectUser(item)}
          className={styles.userBox}
          key={index}
        >
          <Box sx={{ mr: 1.5 }}>
            <Avatar {...stringAvatar(item.nombre)} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography className={styles.userName}>{item.nombre}</Typography>
            <Typography className={styles.userJob}>
              {item.puestoTrabajo}
            </Typography>
          </Box>
        </Box>
      ));
  };

  const confirmModal = (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ¿Seguro que quiere cancelar la evaluación?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Las preguntas evaluadas para este usuario van a descartarse.
        </Typography>
        <Box sx={{ width: "80%", margin: "auto", textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
            onClick={handleCancelEvaluation}
          >
            SI
          </Button>
          <Button variant="outlined" color="success" onClick={handleCloseModal}>
            NO
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Box className="container">
      {confirmModal}
      <Box className="headerPageContainer">
        {userSelected === null && (
          <ButtonGoBack uri="evaluations" module="Evaluaciones" />
        )}
        <p className="title">Crear evaluación</p>
      </Box>
      <Box className={styles.evaluationContainer}>
        <h3>Crear evaluación</h3>
        {userSelected === null ? (
          <p className={styles.subTitle}>
            Seleccione el usuario que quiere evaluar
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p className={styles.subTitle}>
              Seleccione la respuesta que más crea conveniente a la pregunta
            </p>
            <Tooltip title="Cancelar evaluación">
              <CancelIcon
                sx={{
                  color: "#f55a5a",
                  fontSize: 30,
                  mt: -5.5,
                  cursor: "pointer",
                }}
                onClick={handleOpenModal}
              />
            </Tooltip>
          </div>
        )}
        {userSelected === null ? (
          <Box>
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
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </Box>
            </Box>
            <Box className={styles.userList}>{usersOrdered()}</Box>
          </Box>
        ) : (
          <CreateEvaluationForm
            questions={questions}
            userSelected={userSelected}
            evaluation_type={TYPE_EVALUATION}
          />
        )}
      </Box>
    </Box>
  );
};

export default Index;
