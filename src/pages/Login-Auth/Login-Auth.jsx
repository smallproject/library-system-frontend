import React from 'react';
import "./Login.css";

export const description =
    "A simple login form with email and password. The submit button says 'Sign in'."


function LoginAuth() {
    return (
        <div className="container">
            <div className={"login-container"}>
                <h2>Login</h2>
                <h7>Enter your email below to login to your account</h7>
                <form action="/authenticate" method={"POST"}>
                    <div className={"input-group"}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id={"username"} name={"username"} placeholder={"@books are nice.com"} required={true}/>
                    </div>
                    <div className={"input-group"}>
                        <label htmlFor="passwored">Password</label>
                        <input type="password" id={"password"} name={"password"} placeholder={"hello world"} required={true}/>
                    </div>
                    <button type={"submit"} className={"login-btn"}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginAuth;
