import * as React from "react";
import { styled, darken } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { getContrastRatio } from "@mui/system";

function getTextColor(backgroundColor) {
  const whiteContrast = getContrastRatio(backgroundColor, "#FFFFFF");
  const blackContrast = getContrastRatio(backgroundColor, "#000000");

  return whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
}

const Search = styled("div")(({ theme, backgroundColor }) => ({
  position: "relative",
  borderRadius: 10,
  backgroundColor: backgroundColor,
  "&:hover": {
    backgroundColor: darken(backgroundColor, 0.03),
  },
  marginLeft: 0,
  height: "100%",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

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
  color: "#000",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

export default function SearchComponent({
  setValue,
  backgroundColor = "#FFF",
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (setValue) {
      setValue(event.target.value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search backgroundColor={backgroundColor}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search movie..."
          inputProps={{
            "aria-label": "search",
          }}
        />
      </Search>
    </Box>
  );
}
