import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  FormHelperText
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const StudentForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    email: "",
    course: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let temp = {};
    if (!form.name) temp.name = "Name is required.";
    if (!form.studentId) temp.studentId = "Student ID is required.";
    if (!form.email) temp.email = "Email is required.";
    if (!form.course) temp.course = "Course is required.";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleClear = () => {
    setForm({ name: "", studentId: "", email: "", course: "" });
    setErrors({});
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: "800px",
        mx: "auto",
        mt: 3,
        borderRadius: 3,
        backgroundColor: "#ffffff"
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {isEditing ? "✏️ Update Student Details" : "📥 Add New Student"}
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Full Name"
              variant="outlined"
              fullWidth
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="studentId"
              label="Student ID"
              variant="outlined"
              fullWidth
              value={form.studentId}
              onChange={handleChange}
              error={Boolean(errors.studentId)}
              helperText={errors.studentId}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              value={form.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="course"
              label="Course Name"
              variant="outlined"
              fullWidth
              value={form.course}
              onChange={handleChange}
              error={Boolean(errors.course)}
              helperText={errors.course}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
              >
                {isEditing ? "Update" : "Add Student"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<RestartAltIcon />}
                onClick={handleClear}
              >
                Clear Form
              </Button>
            </Box>
            {Object.keys(errors).length > 0 && (
              <FormHelperText error sx={{ mt: 1 }}>
                Please correct the above fields to proceed.
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default StudentForm;
