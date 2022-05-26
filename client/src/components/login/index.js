import React from 'react'
import "../../styles/login.css"

function LoginForm() {
    return (
        <div className="login__page">
            <div className="login__container">
                <h2 className="login__title">Log in</h2>
                
                <div className="login__body">
                    <form className="login__form">
                        <input type="email" className="inputLogin__email" placeholder="Enter email" />
                        <input type="password" className="inputLogin__password" placeholder="Enter password" />
                        <input className="login__buttonSubmit" type="button" value="Log in" />

                        <p>OR</p>
                    </form>
                </div>
                    
                <div className='login__footer'>
                    <a className="link__signUp" href="#">Create a new account?</a>
                </div>
            </div>
        </div>
    )
}

export default LoginForm