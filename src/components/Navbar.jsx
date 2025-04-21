// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Registration System
        </Typography>
        <Box>
          <Button
            color={isActive("/") ? "secondary" : "inherit"}
            component={Link}
            to="/"
          >
            Dashboard
          </Button>
          <Button
            color={isActive("/add") ? "secondary" : "inherit"}
            component={Link}
            to="/add"
          >
            Add Student
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
