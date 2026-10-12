import axios from "axios";

const BASE_URL = "https://6ab19e149751d2b03e6d5ec7.mockapi.io";

export const getProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${BASE_URL}/products`, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/products/${id}`, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/products/${id}`);
  return res.data;
};
