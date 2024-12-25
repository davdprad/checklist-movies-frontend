import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";

const TableMovies = ({ data }) => {
  const [movies, setMovies] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  return (
    <div
      style={{
        backgroundColor: "#4D76AC30",
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
                  width: isSmallScreen ? "20%" : "5%",
                  fontWeight: "bold",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  padding: "8px",
                  width: isSmallScreen ? "80%" : "20%",
                  fontWeight: "bold",
                }}
              >
                Nome do Filme
              </TableCell>
              {!isSmallScreen && (
                <>
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
                </>
              )}
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
                    backgroundColor: "#f6f6f6",
                  },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "0px 10px 0px 10px",
                    width: isSmallScreen ? "20%" : "5%",
                    display: "flex",
                    justifyContent: isSmallScreen ? "flex-start" : "center",
                  }}
                >
                  <Checkbox
                    sx={{
                      margin: 0,
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "8px",
                    width: isSmallScreen ? "80%" : "20%",
                  }}
                >
                  {movie.title}
                </TableCell>
                {!isSmallScreen && (
                  <>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        padding: "8px",
                        width: "60%",
                      }}
                    >
                      {movie.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        padding: "8px",
                        width: "15%",
                      }}
                    >
                      {movie.release_date}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableMovies;
