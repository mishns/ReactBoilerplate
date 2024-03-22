import { validateResponse } from "@api/validateResponse";
import { API_URL, DEV_COOKIES_HEADERS } from "@constants";
import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string().min(5, "Заголовок не может быть короче пяти символов"),
  text: z
    .string()
    .min(1, "Текст заметки не может быть короче десяти символов")
    .max(300, "Текст заметки не может быть длиннее трехсот символов"),
});
export type NewNote = z.infer<typeof newNoteSchema>;

const NoteDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});
export type NoteData = z.infer<typeof NoteDataSchema>;

const NoteListSchema = z.object({
  list: z.array(NoteDataSchema),
  pageCount: z.number(),
});
export type NoteListResponse = z.infer<typeof NoteListSchema>;

export function fetchNoteList(): Promise<NoteListResponse> {
  return fetch(`${API_URL}/notes`, DEV_COOKIES_HEADERS)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => NoteListSchema.parse(data));
}

export function createNote(title: string, text: string): Promise<void> {
  return fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, text }),
    ...DEV_COOKIES_HEADERS,
  })
    .then(validateResponse)
    .then(() => undefined);
}
