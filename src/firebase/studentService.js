// src/firebase/studentService.js
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    query,
    where
  } from "firebase/firestore";
  import { db } from "./config";
  
  const studentsCollection = collection(db, "students");
  
  export const addStudent = async (student) => {
    return await addDoc(studentsCollection, student);
  };
  
  export const getStudents = async () => {
    const data = await getDocs(studentsCollection);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };
  
  export const getStudentById = async (id) => {
    const studentDoc = doc(db, "students", id);
    const studentSnap = await getDoc(studentDoc);
    return { ...studentSnap.data(), id: studentSnap.id };
  };
  
  export const updateStudent = async (id, updatedData) => {
    const studentDoc = doc(db, "students", id);
    await updateDoc(studentDoc, updatedData);
  };
  
  export const deleteStudent = async (id) => {
    const studentDoc = doc(db, "students", id);
    await deleteDoc(studentDoc);
  };
  
  export const searchStudents = async (keyword) => {
    const q = query(studentsCollection, where("name", "==", keyword));
    const results = await getDocs(q);
    return results.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };
  