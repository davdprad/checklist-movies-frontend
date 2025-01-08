import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchComponent from "../components/search/SearchField";

export default function SearchAppBar() {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(45deg, #C000F6, #C700FF)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div>
            <SearchComponent backgroundColor="#FFFFFF90" color="#22003B" />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
