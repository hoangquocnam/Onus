import React, {useState} from "react";
import "../components"
import LoginForm from "../components/login";

function TestComponents(){
    const adminUser = {
    username: "buitansang",
    password: "123123"
  }
  const [user, setUser] = useState ({username: "", password: ""});
  const [error, setError] = useState ("");

  const Login = details => {
    console.log(details);
    if (details.username = adminUser.username && details.password == adminUser.password) {
      setUser({
        username: details.username,
        password: details.password
      });
    } else {
      setError("Failed");
    }
  }
  const Logout = () => {
    setUser({username: "", password: ""});
  }

  return (
    <div className="App">
      {(user.username !== "") ? (
        <div className='welcome'>
          <h2>Welcome to LoginForm</h2>
          <button onClick={Logout}>Logout</button>
          </div>
         ) : (
        <LoginForm Login={Login} erro={error}/>
      )}
    </div>
  );
}

export default TestComponents;