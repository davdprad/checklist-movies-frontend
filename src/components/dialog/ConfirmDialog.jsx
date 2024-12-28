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
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px",
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ padding: "10px" }}>
        <Button onClick={() => setOpenDialog(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleFunction} color="error">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
