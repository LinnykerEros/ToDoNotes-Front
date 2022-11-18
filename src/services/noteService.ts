import { api } from "../config/axios";

interface NoteInterface {
  id?: string;
  title: string;
  authorId: string;
  description: string;
  content: string;
}

async function getNotes() {
  const notes = await api.get("/note");
  return notes.data;
}

async function getNoteById(id: string) {
  const note = await api.get(`/note/${id}`);
  return note.data;
}

async function updateNote(
  id: string,
  { title, content, authorId, description }: NoteInterface
) {
  // console.log(id);
  const note = await api.put(`/note/${id}`, {
    title,
    description,
    content,
    authorId,
  });
  return note.data;
}
async function deleteNote(id: string) {
  return await api.delete(`/note/${id}`);
}

async function createNote({
  title,
  content,
  authorId,
  description,
}: NoteInterface) {
  const note = await api.post("/note", {
    title,
    authorId,
    content,
    description,
  });
  return note.data;
}

export { getNotes, getNoteById, updateNote, createNote, deleteNote };
