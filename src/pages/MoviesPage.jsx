import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableMovies from "../components/table/TableMovies";
import MovieList from "./SearchMovies";

const MoviesPage = () => {
  const [dataMovies, setDataMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://checklist-movies-backend.onrender.com/my-list/movies");
        const data = await response.json();
        setDataMovies(data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Box
      sx={{
        height: "91.1vh",
        margin: 0,
        padding: "20px",
        boxSizing: "border-box",
        overflowX: "hidden",
        position: "relative",
        background: `linear-gradient(45deg, #22003B, #150024)`,
      }}
    >
      <TableMovies data={dataMovies} />
      <MovieList />
    </Box>
  );
};

export default MoviesPage;
