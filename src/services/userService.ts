import { api } from "../config/axios";

interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  notes?: [];
}

async function getUser() {
  const users = await api.get("/user");

  return users.data;
}

async function getUserById(id: string) {
  const users = await api.get(`/user/${id}`);

  return users.data;
}

async function createUser({ name, email, password }: UserInterface) {
  const user = await api.post("/user", {
    name,
    email,
    password,
  });

  return user.data;
}
async function updateUser({ id, name, email, password }: UserInterface) {
  const user = await api.put(`/user/${id}`, {
    name,
    email,
    password,
  });
  return user.data;
}

async function deleteUser(id: string) {
  return await api.delete(`/user/${id}`);
}

export { createUser, getUser, updateUser, deleteUser, getUserById };
