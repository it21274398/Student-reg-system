// src/components/SearchBar.jsx
import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // Reset to full list
  };

  return (
    <TextField
      fullWidth
      placeholder="Search by name"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      variant="outlined"
      sx={{ mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {query ? (
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchBar;
