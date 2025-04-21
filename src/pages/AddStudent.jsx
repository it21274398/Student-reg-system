// src/pages/AddStudent.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { addStudent } from "../firebase/studentService";

const AddStudent = () => {
  const navigate = useNavigate();

  const handleAdd = async (studentData) => {
    try {
      await addStudent(studentData); // Firebase function
      navigate("/"); // Redirect to dashboard after adding
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return <StudentForm onSubmit={handleAdd} />;
};

export default AddStudent;
