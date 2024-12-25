import React from "react";
import { Typography, Button, Modal, Box, CardMedia } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "80%", md: "600px" }, // Modal responsivo
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: { xs: 2, sm: 4 }, // Ajustando padding para telas menores
  borderRadius: 5,
};

const ModalInfoMovie = ({ isModalOpen, handleCloseModal, selectedMovie }) => {
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
        {/* Primeira caixa: Imagem e Título + Descrição lado a lado */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" }, // Titulo e imagem lado a lado
            gap: 2,
            marginBottom: 2,
          }}
        >
          {/* Imagem do filme */}
          <CardMedia
            component="img"
            sx={{
              objectFit: "cover",
              height: { xs: 150, sm: 250 },
              width: { xs: 100, sm: 150 }, // Ajustando imagem para dispositivos móveis
              borderRadius: 2,
            }}
            image={
              selectedMovie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                : "https://via.placeholder.com/150x250/808080/FFFFFF?text=No+Image"
            }
            alt={selectedMovie?.title || "Movie Image"}
          />

          {/* Título e Descrição */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start", // Garante que os elementos fiquem no topo
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
          </Box>
        </Box>

        {/* Segunda caixa: Descrição do filme */}
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
            {selectedMovie?.overview || "Descrição não disponível."}
          </Typography>
        </Box>

        {/* Terceira caixa: Botão de Fechar */}
        <Button
          onClick={handleCloseModal}
          sx={{
            mt: 2,
            borderRadius: 3,
            backgroundColor: "#252561",
            color: "#FFF",
            textTransform: "none",
            fontFamily: "Roboto, sans-serif",
            ":hover": {
              backgroundColor: "#191942",
            },
          }}
          variant="contained"
          fullWidth
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalInfoMovie;
