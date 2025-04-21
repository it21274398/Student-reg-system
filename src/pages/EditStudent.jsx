// src/pages/EditStudent.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import {
  getStudentById,
  updateStudent
} from "../firebase/studentService";
import { CircularProgress, Box, Typography } from "@mui/material";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching student:", error);
        alert("Failed to fetch student details.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateStudent(id, updatedData);
      navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Something went wrong while updating.");
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Loading student data...</Typography>
      </Box>
    );
  }

  return (
    <StudentForm
      initialData={studentData}
      onSubmit={handleUpdate}
      isEditing={true}
    />
  );
};

export default EditStudent;
