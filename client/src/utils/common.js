import { methods, URL_Requests } from "../APIs";
import { TOKEN_KEY } from "../constants";

export function getTokenFromStorage() {
  const token =
    localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  return token;
}

export function setTokenToStorage(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function authenticate(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return methods.get(URL_Requests.me.url, config);
}
