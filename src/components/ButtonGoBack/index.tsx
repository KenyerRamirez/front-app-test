import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import React from "react";
import { Tooltip } from "@mui/material";

interface ButtonGoBackProps {
  uri: string;
  module: string;
}

const ButtonGoBack: React.FC<ButtonGoBackProps> = ({ uri, module }) => {
  return (
    <Tooltip title={`Ir a ${module}`}>
      <Link to={`/${uri}`}>
        <ArrowBackIcon sx={{ width: 24, color: "#8b8b8b", mt: 0.5, mr: 1 }} />
      </Link>
    </Tooltip>
  );
};

export default ButtonGoBack;
