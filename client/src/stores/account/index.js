import { createContext, useEffect, useState } from "react";
import { methods, URL_Requests } from "../../APIs";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenToStorage,
} from "../../utils/auth";

export const AccountContext = createContext();

export function AccountProvider(props) {
  const [account, setAccount] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const token = getTokenFromStorage();

    auth(token).catch((err) => {
      removeTokenFromStorage();
    });
  }, [setIsAuthenticating]);

  function login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: { token },
        } = await methods.post(URL_Requests.login.url, data);

        setTokenToStorage(token);
        resolve(await auth(token));
      } catch (error) {
        reject(error);
      }
    });
  }

  function signup(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await methods.post(URL_Requests.signup.url, data);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  function updateProfile(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await methods.patch(URL_Requests.users.editUser(account.id), data);

        setAccount({
          id: account.id,
          ...data,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    })
  }

  function auth(token) {
    return new Promise(async (resolve, reject) => {
      setIsAuthenticating(true);
      try {
        const { data: account } = await methods.get(URL_Requests.me.url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAccount(account);
        resolve(account);
      } catch (error) {
        reject(error);
      } finally {
        setIsAuthenticating(false);
      }
    });
  }

  function logout() {
    removeTokenFromStorage();
    setAccount(null);
  }

  return (
    <AccountContext.Provider
      value={{ account, login, logout, signup, setAccount, isAuthenticating, updateProfile }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}
