import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({
  openDialog,
  setOpenDialog,
  handleFunction,
  title = "Confirmar",
  message = "Você tem certeza que deseja executar a ação?",
}) => {
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleFunction} color="error">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
