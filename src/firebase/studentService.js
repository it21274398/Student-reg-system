// src/firebase/studentService.js
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import { db } from "./config";

// Reference to "students" collection
const studentsCollection = collection(db, "students");

// Add a new student
export const addStudent = async (student) => {
  return await addDoc(studentsCollection, student);
};

// Get all students
export const getStudents = async () => {
  const data = await getDocs(studentsCollection);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Get a single student by ID
export const getStudentById = async (id) => {
  const studentDoc = doc(db, "students", id);
  const studentSnap = await getDoc(studentDoc);
  return { ...studentSnap.data(), id: studentSnap.id };
};

// Update student by ID
export const updateStudent = async (id, updatedData) => {
  const studentDoc = doc(db, "students", id);
  await updateDoc(studentDoc, updatedData);
};

// Delete student by ID
export const deleteStudent = async (id) => {
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
};

// 🔍 Search students by name (partial match)
export const searchStudents = async (keyword) => {
  const data = await getDocs(studentsCollection);
  const lowerKeyword = keyword.toLowerCase();
  
  return data.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter((student) =>
      student.name?.toLowerCase().includes(lowerKeyword)
    );
};
