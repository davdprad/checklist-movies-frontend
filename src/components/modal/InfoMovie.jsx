import React from "react";
import { Typography, Button, Modal, Box, CardMedia } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "80%", md: "600px" },
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: { xs: 2, sm: 4 },
  borderRadius: 5,
};

const ModalInfoMovie = ({
  isModalOpen,
  handleCloseModal,
  selectedMovie,
  handleAddMovie,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            gap: 2,
            marginBottom: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: "cover",
              height: { xs: 150, sm: 250 },
              width: { xs: 100, sm: 150 },
              borderRadius: 2,
            }}
            image={
              selectedMovie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                : "https://via.placeholder.com/150x250/808080/FFFFFF?text=No+Image"
            }
            alt={selectedMovie?.title || "Movie Image"}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 1,
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                fontSize: { xs: "16px", sm: "20px" },
                lineHeight: 1.2,
              }}
            >
              {selectedMovie?.title || "Título Indisponível"}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "gray",
                fontFamily: "Roboto, sans-serif",
                lineHeight: 1.4,
              }}
            >
              {selectedMovie?.release_date || "Não disponível"}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(0, max-content))",
                gap: "10px",
                justifyContent: "start",
                flexWrap: "wrap",
              }}
            >
              {selectedMovie?.platforms.map((platform, index) => (
                <Typography
                  key={index}
                  fontSize="12px"
                  sx={{
                    backgroundColor: "#f1f1f1",
                    padding: "5px",
                    borderRadius: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {platform?.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.7)",
              textAlign: "justify",
              lineHeight: 1.6,
              fontFamily: "Roboto, sans-serif",
            }}
          >
            {selectedMovie?.description || "Descrição não disponível."}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Button
            onClick={handleCloseModal}
            sx={{
              mt: 2,
              borderRadius: 3,
              backgroundColor: "#252561",
              color: "#FFF",
              textTransform: "none",
              transition: "transform 0.2s ease",
              ":hover": {
                boxShadow: "none",
                backgroundColor: "#191942",
                transform: "scale(1.02)",
              },
            }}
            variant="contained"
            fullWidth
          >
            Fechar
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleAddMovie(selectedMovie.id)}
            sx={{
              mt: 2,
              borderRadius: 3,
              backgroundColor: "#252561",
              color: "#FFF",
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
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalInfoMovie;
