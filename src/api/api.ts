import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const API = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Flights (admin + user)
export const getFlights = () => API.get("/flights");
export const getFlight = (id: string) => API.get(`/flights/${id}`);
export const createFlight = (payload: any) => API.post("/flights", payload);
export const updateFlight = (id: string, payload: any) => API.put(`/flights/${id}`, payload);
export const deleteFlight = (id: string) => API.delete(`/flights/${id}`);

// Reservations (user)
export const createReservation = (payload: any) => API.post("/reservations", payload);
export const getReservations = () => API.get("/reservations");
export const getReservationsForUser = (userId: string) => API.get(`/reservations?userId=${userId}`);
export const cancelReservation = (id: string) => API.delete(`/reservations/${id}`);

// Users (profile)
export const createUser = (payload: any) => API.post("/users", payload);
export const updateUser = (id: string, payload: any) => API.put(`/users/${id}`, payload);
export const getUser = (id: string) => API.get(`/users/${id}`);
export const deleteUser = (id: string) => API.delete(`/users/${id}`);

// Expose raw API for custom calls
export default API;

