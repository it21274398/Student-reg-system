// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Avatar
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getStudents, deleteStudent, searchStudents } from "../firebase/studentService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    const data = await getStudents();
    setStudents(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      fetchStudents();
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      fetchStudents();
    } else {
      const results = await searchStudents(query);
      setStudents(results);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const courseSummary = students.reduce((acc, student) => {
    const course = student.course || "Unknown";
    acc[course] = (acc[course] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(courseSummary).map(([course, count]) => ({
    course,
    count
  }));

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "studentId", headerName: "Student ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "course", headerName: "Course", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => navigate(`/edit/${params.row.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        📊 Student Dashboard
      </Typography>

      {/* Summary Cards + Chart */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={4} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#1976d2" }}>
              <PeopleIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Total Students</Typography>
              <Typography variant="h6">{students.length}</Typography>
            </Box>
          </Paper>
        </Grid>

        
      </Grid>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Student Table */}
      <Paper elevation={4} sx={{ mt: 2, height: 500, p: 2 }}>
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          disableRowSelectionOnClick
          sx={{
            borderRadius: 2,
            backgroundColor: "#fff"
          }}
        />
      </Paper>
    </Box>
  );
};

export default Dashboard;
