import * as React from "react";
import { AppBar, Box, useMediaQuery, useTheme } from '@mui/material';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchComponent from "../components/search/SearchField";

export default function SearchAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background: isMobile ? " #7A19ED" : " #C000F6",
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
