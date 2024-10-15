import React, { useEffect, useState } from "react";
import styles from "../css/index.module.css";
import "../../../css/index.css";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import ButtonGoBack from "../../../components/ButtonGoBack";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getEmployees } from "../../../services/employees";
import { getQuestions } from "../../../services/questions";
import CreateEvaluationForm from "../../../components/CreateEvaluationForm/CreateEvaluationForm";

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

  return (
    <Box className="container">
      <Box className="headerPageContainer">
        <ButtonGoBack uri="evaluations" module="Evaluaciones" />
        <p className="title">Crear evaluación</p>
      </Box>
      <Box className={styles.evaluationContainer}>
        <h3>Crear evaluación</h3>
        <p className={styles.subTitle}>
          {userSelected === null
            ? "Seleccione el usuario que quiere evaluar"
            : "Seleccione la respuesta que más crea conveniente a la pregunta"}
        </p>
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
