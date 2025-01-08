import React from "react";
import SearchAppBar from "./layout/Header";
import MoviesPage from "./pages/MoviesPage";
import { Box } from "@mui/material";

const App = () => {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <SearchAppBar />
        <MoviesPage />
      </Box>
    </>
  );
};

export default App;
