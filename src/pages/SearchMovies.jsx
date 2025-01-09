import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Grid2, Card, CardMedia } from "@mui/material";
import SearchComponent from "../components/search/SearchField";
import ModalInfoMovie from "../components/modal/InfoMovie";
import LinearProgress from "@mui/material/LinearProgress";
import { useMediaQuery, useTheme } from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceTimeout = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://checklist-movies-backend.onrender.com/api/movie-list?movie=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
    setLoading(false);
  }, [searchTerm]);

  const fetchMovieDetail = async (movie_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://checklist-movies-backend.onrender.com/api/movie-data?movie_id=${movie_id}`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
    setLoading(false);
  };

  const addMovie = async (movieId) => {
    try {
      const response = await fetch(
        `https://checklist-movies-backend.onrender.com/my-list/add-movie?movie=${movieId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
    fetchMovieDetail(movie.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <SearchComponent
            setValue={setSearchTerm}
            backgroundColor="#FFFFFF00"
            placeholder="Search..."
            width="100%"
            color={isMobile ? "#7A19ED" : "#C000F6"}
            border={`1px solid ${isMobile ? "#7A19ED" : "#C000F6"}`}
          />
          {loading && (
            <LinearProgress
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "4px",
                color: isMobile ? "#7A19ED" : "#C000F6",
              }}
              sx={{
                bgcolor: "rgb(62, 47, 72)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: `1px solid ${isMobile ? "#7A19ED" : "#C000F6"}`,
                },
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
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid2 key={movie.id}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "none",
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF00",
                  outline: `1px solid ${isMobile ? "#7A19ED" : "#C000F6"}`,
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
                    onClick={() => handleCardClick(movie)}
                  />
                </div>
                <div
                  className="card-content"
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
                  <div
                    style={{ justifyContent: "center" }}
                    onClick={() => handleCardClick(movie)}
                  >
                    <p
                      style={{
                        fontSize: 16,
                        fontFamily: "Segoe UI",
                        height: 50,
                        overflow: "auto",
                        margin: 0,
                        fontWeight: "bold",
                        color: "#ffffff",
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
                      background: isMobile ? "#7A19ED" : "#C000F6",
                      alignItems: "flex-end",
                      borderRadius: 3,
                      boxShadow: "none",
                      textTransform: "none",
                      transition: "background 0.3s ease, transform 0.2s ease",
                      color: "#22003B",
                      ":hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    + Add
                  </Button>
                </div>
              </Card>
            </Grid2>
          ))
        ) : (
          <p style={{ fontFamily: "Segoe UI", color: isMobile ? "#7A19ED" : "#C000F6" }}>
            Not movies available
          </p>
        )}
      </Grid2>
      {selectedMovie && (
        <ModalInfoMovie
          selectedMovie={selectedMovie}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          handleAddMovie={addMovie}
        />
      )}
    </div>
  );
};

export default MovieList;
