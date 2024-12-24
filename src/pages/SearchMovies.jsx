import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import { Button, Grid2, Card, CardMedia } from "@mui/material";
import SearchComponent from "../components/search/SearchField";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/movie-data?movie=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const addMovie = async (movieId) => {
    try {
      const response = await fetch("http://localhost:8000/add-movie/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movieId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao adicionar filme:", errorData.detail);
        alert(`Erro: ${errorData.detail}`);
        return;
      }

      const data = await response.json();
      console.log("Filme adicionado com sucesso:", data);
      alert("Filme adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      alert("Erro ao adicionar filme. Tente novamente.");
    }
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      if (searchTerm) {
        fetchMovies();
      }
    }, 1000);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm, fetchMovies, debounceTimeout]);

  return (
    <div style={{ padding: "20px", backgroundColor: alpha("#9AAFCE", 0.05) }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <SearchComponent setValue={setSearchTerm} backgroundColor="#D3E0E6" />
      </div>
      <Grid2
        container
        spacing={3}
        sx={{
          justifyContent: "center",
        }}
      >
        {movies.map((movie) => (
          <Grid2 key={movie.id}>
            <Card
              sx={{
                borderRadius: 5,
                backgroundColor: "#D3E0E6",
                boxShadow: "none",
                overflow: "hidden",
                ":hover": {
                  backgroundColor: alpha("#D3E0E6", 1.15),
                },
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "cover",
                    height: 300,
                    width: 200,
                    margin: 0,
                    transition: "transform 0.5s ease",
                    ":hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/200x300/808080/FFFFFF?text=No+Image"
                  }
                  alt={movie.title}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: 120,
                  width: 200,
                  padding: 10,
                  boxSizing: "border-box",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div style={{ justifyContent: "center" }}>
                  <p
                    style={{
                      fontSize: 16,
                      fontFamily: "Segoe UI",
                      height: 50,
                      overflow: "auto",
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {movie.title}
                  </p>
                </div>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => addMovie(movie.id)}
                  sx={{
                    backgroundColor: "#252561",
                    alignItems: "flex-end",
                    borderRadius: 3,
                    boxShadow: "none",
                    textTransform: "none",
                    transition: "transform 0.2s ease",
                    ":hover": {
                      boxShadow: "none",
                      backgroundColor: "#191942",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  + Add
                </Button>
              </div>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default MovieList;
