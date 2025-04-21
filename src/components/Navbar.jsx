// src/components/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/add", label: "Add Student" }
  ];

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <MenuBookIcon sx={{ fontSize: 30, mr: 1 }} />
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: "none", fontWeight: 600 }}>
            StudentReg
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              variant={location.pathname === item.path ? "contained" : "text"}
              color={location.pathname === item.path ? "secondary" : "inherit"}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: isMobile ? "0.8rem" : "1rem",
                transition: "0.3s",
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? undefined : "rgba(255,255,255,0.1)"
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
