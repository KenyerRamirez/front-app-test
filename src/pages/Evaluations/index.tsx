import React, { useEffect, useState } from "react";
import styles from "./css/index.module.css";
import "../../css/index.css";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getEvaluations } from "../../services/evaluations";
import { getEmployees } from "../../services/employees";
import { Link, useNavigate } from "react-router-dom";

interface Column {
  id: "usuarioEvaluado" | "evaluador" | "acciones";
  label: string;
  minWidth?: number;
  align: "center"; // Center the text for better alignment
}

const columns: readonly Column[] = [
  {
    id: "usuarioEvaluado",
    label: "Usuario Evaluado",
    minWidth: 170,
    align: "center",
  },
  { id: "evaluador", label: "Evaluador", minWidth: 170, align: "center" },
  { id: "acciones", label: "Acciones", minWidth: 170, align: "center" },
];

const Index = () => {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const navigation = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const findEmployeeName = (employeeId: string) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    return employee ? employee.nombre : "Desconocido";
  };

  const handleViewEvaluation = (id: string, name: string) => {
    navigation(`/evaluations/${id}?user=${encodeURIComponent(name)}`);
  };

  const filteredResults = evaluations.filter((item) =>
    findEmployeeName(item.usuarioEvaluado)
      .toLowerCase()
      .includes(searchUser.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evaluationsData = await getEvaluations();
        setEvaluations(evaluationsData);
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.log("Was an error trying to get evaluations:", error);
      }
    };
    fetchData();
  }, []);
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
              placeholder="Busca el usuario evaluado"
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </Box>
          <Box>
            <Link to="/evaluations/create">
              <Button className={styles.buttonToCreate}>
                <p className={styles.textCreate}>Crear Evaluación</p>
              </Button>
            </Link>
          </Box>
        </Box>
        <Box>
          <Paper sx={{ width: "100%", overflowY: "auto" }}>
            <TableContainer sx={{ height: 300 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredResults
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((evaluation, index) => {
                      const usuarioEvaluadoName = findEmployeeName(
                        evaluation.usuarioEvaluado
                      );
                      const evaluadorName = findEmployeeName(
                        evaluation.evaluador
                      );

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="center">
                            {usuarioEvaluadoName}
                          </TableCell>
                          <TableCell align="center">{evaluadorName}</TableCell>
                          <TableCell align="center">
                            <Button
                              className={styles.viewButton}
                              onClick={() =>
                                handleViewEvaluation(
                                  evaluation._id,
                                  usuarioEvaluadoName
                                )
                              }
                            >
                              <p className={styles.textAction}>Ver</p>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[4, 10, 25, 100]}
              component="div"
              count={filteredResults.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
