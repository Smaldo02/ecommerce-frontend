import axios from "axios";

const BASE_URL = "https://6ab19e149751d2b03e6d5ec7.mockapi.io";

export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${BASE_URL}/users/${id}`);
  return res.data;
};

export const createUser = async (data) => {
  const now = new Date().toISOString();
  const res = await axios.post(`${BASE_URL}/users`, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`);
  return res.data;
};
