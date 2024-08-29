import { Box, Grid2, Tooltip } from "@mui/material";
import React, { useState } from "react";
import styles from "./css/index.module.css";
import GridViewIcon from "@mui/icons-material/GridView";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from 'react-router-dom';

interface NavProps {
  children: React.ReactNode;
}

const Index = ({ children }: NavProps) => {
  const [itemSelected, setItemSelected] = useState<string>("Dashboard");
  const selectItem = (item: string) => {
    setItemSelected(item);
  };
  return (
    <Grid2 container spacing={2} className={styles.parent}>
      <Grid2 size={1} className={styles.navBar}>
        <Box className={styles.navBlockUp}>
          <Box
            className={
              itemSelected === "Dashboard"
                ? styles.navItemSelected
                : styles.navItem
            }
          >
            <Link to="/dashboard" onClick={() => selectItem("Dashboard")}>
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
            <Link to="/evaluations" onClick={() => selectItem("Evaluaciones")}>
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
            <Link to="#" onClick={() => selectItem("Usuarios")}>
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
            <Link to="#" onClick={() => selectItem("Feedback")}>
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
            <Link to="#" onClick={() => selectItem("Perfil")}>
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
            <Link to="/login" onClick={() => selectItem("Cerrar sesión")}>
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
      <Grid2 size={11}>{children}</Grid2>
    </Grid2>
  );
};

export default Index;
