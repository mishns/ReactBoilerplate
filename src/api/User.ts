import { queryClient } from "@api/queryClient";
import { validateResponse } from "@api/validateResponse";
import { API_URL, DEV_COOKIES_HEADERS } from "@constants";
import { z } from "zod";

export const MeSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
});
export type Me = z.infer<typeof MeSchema>;

export function fetchMe(): Promise<Me> {
  return fetch(`${API_URL}/users/me`, DEV_COOKIES_HEADERS)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => MeSchema.parse(data));
}

export function registerUser(
  username: string,
  email: string,
  password: string,
): Promise<void> {
  return fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function login(email: string, password: string): Promise<void> {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    ...DEV_COOKIES_HEADERS,
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function logout(): Promise<void> {
  return fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    ...DEV_COOKIES_HEADERS,
  })
    .then(invalidateMe)
    .then(() => undefined);
}

export function invalidateMe(): void {
  queryClient.invalidateQueries({ queryKey: ["users", "me"] });
  queryClient.invalidateQueries({ queryKey: ["notes"] });
}
