import api from "./axios";

export const getStudents = () => api.get("/students");

export const addStudent = (data) => api.post("/students", data);

export const deleteStudent = (id) =>
  api.delete(`/students/${id}`);
