import { Box, Grid2, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./css/index.module.css";
import GridViewIcon from "@mui/icons-material/GridView";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useLocation } from "react-router-dom";

interface NavProps {
  children: React.ReactNode;
}

const Index = ({ children }: NavProps) => {
  const location = useLocation();
  const [itemSelected, setItemSelected] = useState<string>("Dashboard");
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleLogOut = () => {
    localStorage.removeItem("Access-token");
  };
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    switch (path) {
      case "":
        setIsHidden(false);
        setItemSelected("Dashboard");
        break;
      case "evaluations":
        setIsHidden(false);
        setItemSelected("Evaluaciones");
        break;
      case "users":
        setIsHidden(false);
        setItemSelected("Usuarios");
        break;
      case "feedback":
        setIsHidden(false);
        setItemSelected("Feedback");
        break;
      case "profile":
        setItemSelected("Perfil");
        setIsHidden(false);
        break;
      case "login":
        setIsHidden(true);
        break;
      case "register":
        setIsHidden(true);
        break;
      default:
        setIsHidden(false);
        setItemSelected("Dashboard");
    }
  }, [location.pathname]);

  return (
    <Grid2 container spacing={2} className={styles.parent}>
      {!isHidden && (
        <Grid2 size={1} className={styles.navBar}>
          <Box className={styles.navBlockUp}>
            <Box
              className={
                itemSelected === "Dashboard"
                  ? styles.navItemSelected
                  : styles.navItem
              }
            >
              <Link to="/">
                <Tooltip title="Dashboard">
                  <GridViewIcon
                    className={
                      itemSelected === "Dashboard"
                        ? styles.navIconSelected
                        : styles.navIcon
                    }
                    sx={{ fontSize: "30px" }}
                  />
                </Tooltip>
              </Link>
            </Box>
            <Box
              className={
                itemSelected === "Evaluaciones"
                  ? styles.navItemSelected
                  : styles.navItem
              }
            >
              <Link to="/evaluations">
                <Tooltip title="Evaluaciones">
                  <AssignmentOutlinedIcon
                    className={
                      itemSelected === "Evaluaciones"
                        ? styles.navIconSelected
                        : styles.navIcon
                    }
                    sx={{ fontSize: "30px" }}
                  />
                </Tooltip>
              </Link>
            </Box>
            <Box
              className={
                itemSelected === "Usuarios"
                  ? styles.navItemSelected
                  : styles.navItem
              }
            >
              <Link to="/users">
                <Tooltip title="Usuarios">
                  <PeopleAltOutlinedIcon
                    className={
                      itemSelected === "Usuarios"
                        ? styles.navIconSelected
                        : styles.navIcon
                    }
                    sx={{ fontSize: "30px" }}
                  />
                </Tooltip>
              </Link>
            </Box>
            <Box
              className={
                itemSelected === "Feedback"
                  ? styles.navItemSelected
                  : styles.navItem
              }
            >
              <Link to="/feedback">
                <Tooltip title="Feedback">
                  <FeedbackOutlinedIcon
                    className={
                      itemSelected === "Feedback"
                        ? styles.navIconSelected
                        : styles.navIcon
                    }
                    sx={{ fontSize: "30px" }}
                  />
                </Tooltip>
              </Link>
            </Box>
          </Box>
          <Box className={styles.navBlockDown}>
            <Box
              className={
                itemSelected === "Perfil"
                  ? styles.navItemSelected
                  : styles.navItem
              }
            >
              <Link to="/profile">
                <Tooltip title="Perfil">
                  <PermIdentityOutlinedIcon
                    className={
                      itemSelected === "Perfil"
                        ? styles.navIconSelected
                        : styles.navIcon
                    }
                    sx={{ fontSize: "30px" }}
                  />
                </Tooltip>
              </Link>
            </Box>
            <Box
              className={
                itemSelected === "Cerrar sesión"
                  ? styles.navItemSelected
                  : styles.navItem
              }
            >
              <Link to="/login" onClick={handleLogOut}>
                <Tooltip title="Cerrar sesión">
                  <LogoutOutlinedIcon
                    className={
                      itemSelected === "Cerrar sesión"
                        ? styles.navIconSelected
                        : styles.navIcon
                    }
                    sx={{ fontSize: "30px" }}
                  />
                </Tooltip>
              </Link>
            </Box>
          </Box>
        </Grid2>
      )}
      <Grid2 size={11}>{children}</Grid2>
    </Grid2>
  );
};

export default Index;
