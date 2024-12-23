import React from "react";
import SearchAppBar from "./layout/Header";
import MoviesPage from "./pages/MoviesPage";
import MovieList from "./pages/SearchMovies";

const App = () => {
  return (
    <>
      <SearchAppBar />
      <MoviesPage />
      <MovieList />
    </>
  );
};

export default App;
