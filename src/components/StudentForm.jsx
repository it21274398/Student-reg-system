// src/components/StudentForm.jsx
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Typography
} from "@mui/material";

const StudentForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    email: "",
    course: ""
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, studentId, email, course } = form;
    if (!name || !studentId || !email || !course) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit(form); // Pass data to Add or Edit page
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? "Edit Student" : "Add Student"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              label="Student Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="studentId"
              label="Student ID"
              value={form.studentId}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="course"
              label="Course"
              value={form.course}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update Student" : "Add Student"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() =>
                  setForm({ name: "", studentId: "", email: "", course: "" })
                }
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default StudentForm;
