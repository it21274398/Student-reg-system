// src/pages/NotFound.jsx
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Page Not Found
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default NotFound;
