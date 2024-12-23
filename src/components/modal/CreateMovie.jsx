import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import SelectOptions from "../select/SelectButton";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 4,
  borderRadius: 2,
};

const ModalCreateMovie = ({ stateModal, setStateModal }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (stateModal) {
      reset({
        movieName: "",
        description: "",
        mode: "",
      });
    }
  }, [stateModal, reset]);

  const onSubmit = (data) => {
    console.log("Dados do Filme:", data);
    setStateModal(false);
  };

  return (
    <Modal open={stateModal} onClose={() => setStateModal(false)}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "25px",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              margin: 0,
              padding: 0,
            }}
          >
            Adicionar Filme
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setStateModal(false)}
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome do Filme"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            {...register("movieName", {
              required: "Nome do filme é obrigatório",
            })}
            error={!!errors.movieName}
            helperText={errors.movieName ? errors.movieName.message : ""}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            {...register("description", {
              required: "Descrição é obrigatória",
            })}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          <SelectOptions
            options={["Nenhum", "Casa", "Cinema"]}
            control={control}
            name="mode"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              marginTop: "25px",
            }}
          >
            Salvar Filme
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCreateMovie;
