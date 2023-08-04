import axios from "axios";
import { baseUrl } from "./baseUrl";

const client = axios.create({
  baseURL: `${baseUrl()}`,
});

export const getAllTasks = async () => {
  try {
    const response = await client.get(`todos`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const addTask = async (task) => {
  try {
    const response = await client.post(`todos`, task);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const updateTask = async (taskId, status) => {
  try {
    const response = await client.put(`todos/${taskId}`, status);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await client.delete(`todos/${id}`);
    return response.data;
  } catch (err) {
    return null;
  }
};
