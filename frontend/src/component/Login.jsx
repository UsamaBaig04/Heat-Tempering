import React, { useRef, useEffect } from 'react';

import login_logo from "../assets/sas.png";
// import Main from "../Main";

const Login = () => {

    const username = useRef();
    const password = useRef();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length = 151) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const handle = () => {
        if (username.current.value == "sas" && password.current.value == "Sas@1234") {
            localStorage.setItem('Username', "sas");
            localStorage.setItem('Password', "Sas@1234");
            localStorage.setItem("token", (generateString()))

        }
    };





    return (
        <>
            <div className="login-container" align="center" >

                <div className="login-card" >
                    <img src={login_logo} />
                    <h2>Login</h2>
                    <h3>Enter your credentials</h3>

                    <form className="login-form">
                        <input
                            className="control"
                            type="text"
                            id='username'
                            placeholder="Username"
                            autocomplete="off"
                            ref={username}
                        />
                        <div className="password">
                            <input
                                className="control"
                                id="password"
                                type="password"
                                placeholder="Password"
                                autocomplete="off"
                                ref={password}
                            />
                        </div>
                        <button className="control" type="submit" onClick={handle}>LOGIN</button>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Login;
