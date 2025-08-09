// import  User  from "../types";

import type { User } from "../types";

const USERS_KEY = "app_users_v1";
const AUTH_KEY = "app_auth_user_v1";

/** get array of users from localStorage */
export function getUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

/** save array of users */
export function setUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** register new user; returns { ok, message } */
export function registerUser(u: User): { ok: boolean; message: string } {
  const users = getUsers();
  if (users.find(x => x.email.toLowerCase() === u.email.toLowerCase())) {
    return { ok: false, message: "Email already registered" };
  }
  users.push(u);
  setUsers(users);
  return { ok: true, message: "Registered successfully" };
}

/** simple login by email & password */
export function loginUser(email: string, password: string): { ok: boolean; message: string; user?: User } {
  const users = getUsers();
  const found = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
  if (!found) return { ok: false, message: "Invalid credentials" };
  localStorage.setItem(AUTH_KEY, JSON.stringify(found));
  return { ok: true, message: "Login successful", user: found };
}

/** logout */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

/** get current logged in user or null */
export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}
