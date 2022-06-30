import React, { useEffect, useState } from "react";
import WebFont from "webfontloader";
import { getTokenFromStorage } from "./utils/common";
import { HomePage, LoginPage } from "./pages";

const App = () => {
  function authenticate() {
    const token = getTokenFromStorage();
    if (token) {
      return token;
    }
    return null;
  }

  const [token, setToken] = useState("");

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Merriweather", "Poppins"],
      },
    });

    setToken(authenticate());
  }, []);

  return <div className="App">{token ? <HomePage /> : <LoginPage />}</div>;
};

export default App;
