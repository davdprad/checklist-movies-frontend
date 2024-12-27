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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ConfirmDialog from "../dialog/ConfirmDialog";

const TableMovies = ({ data }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [openDialog, setOpenDialog] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedMovies = [...movies].sort((a, b) => {
      if (key === "title") {
        return direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (key === "release_date") {
        return direction === "asc"
          ? new Date(a.release_date) - new Date(b.release_date)
          : new Date(b.release_date) - new Date(a.release_date);
      }
      return 0;
    });

    setMovies(sortedMovies);
    setSortConfig({ key, direction });
  };

  const handleCheckboxChange = (movieId) => {
    setSelectedMovies((prevSelectedMovies) =>
      prevSelectedMovies.includes(movieId)
        ? prevSelectedMovies.filter((id) => id !== movieId)
        : [...prevSelectedMovies, movieId]
    );
  };

  const handleDeleteMovies = () => {
    const updatedMovies = movies.filter(
      (movie) => !selectedMovies.includes(movie.id)
    );
    setMovies(updatedMovies);
    setSelectedMovies([]);
    setOpenDialog(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#4D76AC30",
        padding: 10,
        borderRadius: 12,
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-start",
          width: "auto",
          gap: 10,
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenDialog(true)}
          disabled={selectedMovies.length === 0}
          sx={{
            borderRadius: 2,
          }}
        >
          <DeleteIcon />
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpenDialog(true)}
          disabled={selectedMovies.length === 0}
          sx={{
            borderRadius: 2,
          }}
        >
          <DoneIcon />
        </Button>
      </div>
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
                  display: "flex",
                  borderBottom: "none",
                  padding: "8px",
                  width: isSmallScreen ? "80%" : "20%",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("title")}
              >
                Nome do Filme{" "}
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  ))}
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
                      display: "flex",
                      borderBottom: "none",
                      padding: "8px",
                      width: "15%",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("release_date")}
                  >
                    Data de Lançamento{" "}
                    {sortConfig.key === "release_date" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      ))}
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
                    checked={selectedMovies.includes(movie.id)}
                    onChange={() => handleCheckboxChange(movie.id)}
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
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleFunction={handleDeleteMovies}
      />
    </div>
  );
};

export default TableMovies;
