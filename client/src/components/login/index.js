import React, {useState} from 'react'
import "../../styles/login.css"

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({username: "", password: ""});
    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }
    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Login</h2>
                {(error != "") ? (<div className='error'>{error}</div>) : ""}
                <div className='form-group'>
                    <lable htmlFor="username">UserName: </lable>
                    <input type="text" name="username" id="username" onChange={e => setDetails({...details,username: e.target.value})} value={details.username}/>
                </div>
                <div className='form-group'>
                    <lable htmlFor="password">Password: </lable>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details,password: e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="LOGIN"/>
            </div>
        </form>
    )
}

export default LoginForm