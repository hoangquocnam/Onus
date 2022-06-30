import { tokenKey } from "../constants";

export function getTokenFromStorage() {
  const token =
    localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
  if (token) {
    sessionStorage.setItem(tokenKey, token);
  }
  return token;
}


