import React, { useEffect, useState, useCallback, useRef } from "react";
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
        `http://localhost:8000/api/movie-list?movie=${searchTerm}`
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
        `http://localhost:8000/api/movie-data?movie_id=${movie_id}`
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
        `http://localhost:8000/my-list/add-movie?movie=${movieId}`,
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
            color="#C000F6"
            border="1px solid #C000F6"
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
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid2 key={movie.id}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "none",
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF10",
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
                        color: "#ffffff", // Texto branco
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
                      background:
                        "linear-gradient(45deg, #22003B,rgb(26, 0, 45))",
                      alignItems: "flex-end",
                      borderRadius: 3,
                      border: "1px solid #C000F6",
                      boxShadow: "none",
                      textTransform: "none",
                      transition: "background 0.3s ease, transform 0.2s ease",
                      color: "#C000F6",
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
          <p style={{ fontFamily: "Segoe UI", color: "#C000F6" }}>
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
