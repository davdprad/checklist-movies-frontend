import React, { useEffect, useState, useCallback, useRef } from "react";
import { darken } from "@mui/material/styles";
import { Button, Grid2, Card, CardMedia } from "@mui/material";
import SearchComponent from "../components/search/SearchField";
import ModalInfoMovie from "../components/modal/InfoMovie";
import LinearProgress from "@mui/material/LinearProgress";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceTimeout = useRef(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://checklist-movies-backend.onrender.com/movie-data?movie=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
    setLoading(false);
  }, [searchTerm]);

  const addMovie = async (movieId) => {
    try {
      const response = await fetch(
        "https://checklist-movies-backend.onrender.com/add-movie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: movieId }),
        }
      );

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
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchTerm) {
        fetchMovies();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, fetchMovies]);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#4D76AC30",
          }}
        >
          <SearchComponent
            setValue={setSearchTerm}
            backgroundColor="#FFFFFF00"
            placeholder="Search..."
            width="100%"
          />
          {loading && (
            <LinearProgress
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "4px",
              }}
            />
          )}
        </div>
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
                transition: "background-color 0.3s ease",
                ":hover": {
                  backgroundColor: darken("#D3E0E6", 0.1),
                },
              }}
              onClick={() => handleCardClick(movie)}
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
      {selectedMovie && (
        <ModalInfoMovie
          selectedMovie={selectedMovie}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MovieList;
