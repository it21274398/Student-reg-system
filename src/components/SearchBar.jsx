// src/components/SearchBar.jsx
import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  Tooltip,
  Fade
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // Reset list
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 3,
        backgroundColor: "#f9f9f9"
      }}
    >
      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          placeholder="Search students by name..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fff"
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Fade in={!!query}>
                  <Tooltip title="Clear">
                    <IconButton onClick={handleClear} size="small">
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </Fade>
                <Tooltip title="Search">
                  <IconButton onClick={handleSearch} size="small" sx={{ ml: 1 }}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Paper>
  );
};

export default SearchBar;
