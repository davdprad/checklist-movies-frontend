import * as React from "react";
import { styled, darken } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(
  ({ theme, backgroundColor, borderRadius, width }) => ({
    position: "relative",
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    "&:hover": {
      backgroundColor: darken(backgroundColor, 0.1),
    },
    marginLeft: "auto",
    width: "100%",
    transition: "width 0.3s ease, transform 0.3s ease",
    [theme.breakpoints.up("sm")]: {
      width: width,
      "&:focus-within": {
        maxWidth: "100%",
        width: `calc(${width} + 5%)`,
      },
    },
  })
);

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function SearchComponent({
  setValue,
  backgroundColor = "#FFF",
  borderRadius = 10,
  placeholder = "Search...",
  width = "25ch",
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (setValue) {
      setValue(event.target.value);
    }
  };

  return (
    <Search
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      width={width}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "search",
        }}
      />
    </Search>
  );
}
