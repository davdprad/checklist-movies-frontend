import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";

const TableMovies = ({ data }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  return (
    <div
      style={{
        backgroundColor: "#D3E0E6",
        padding: 10,
        borderRadius: 12,
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                marginBottom: "14px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TableCell
                sx={{
                  borderBottom: "none",
                  padding: "8px",
                  width: "5%",
                  fontWeight: "bold",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  padding: "8px",
                  width: "20%",
                  fontWeight: "bold",
                }}
              >
                Nome do Filme
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  padding: "8px",
                  width: "60%",
                  fontWeight: "bold",
                }}
              >
                Descrição Geral
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  padding: "8px",
                  width: "15%",
                  fontWeight: "bold",
                }}
              >
                Data de lançamento
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie, index) => (
              <TableRow
                key={index}
                sx={{
                  marginBottom: index === movies.length - 1 ? "0px" : "10px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TableCell
                  sx={{ borderBottom: "none", padding: "8px", width: "5%" }}
                >
                  <Checkbox />
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "none", padding: "8px", width: "20%" }}
                >
                  {movie.title}
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "none", padding: "8px", width: "60%" }}
                >
                  {movie.description}
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "none", padding: "8px", width: "15%" }}
                >
                  {movie.release_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableMovies;
