import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableMovies from "../components/table/TableMovies";

const MoviesPage = () => {
  const [dataMovies, setDataMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8000/movies");
        const data = await response.json();
        setDataMovies(data.movies);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <TableMovies data={dataMovies} />
      </Box>
    </>
  );
};

export default MoviesPage;
