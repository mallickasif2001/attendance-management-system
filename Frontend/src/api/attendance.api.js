import api from "./axios";

export const getAttendanceByDate = (date) => {
  return api.get(`/attendance/${date}`);
};

export const saveAttendance = (date, records) => {
  return api.post("/attendance", {
    date,
    records,
  });
};
