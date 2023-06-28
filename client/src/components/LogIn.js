import React, { useState } from "react";
import { Login, Facebook } from "../services/UserService";
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";



export default function LogIn() {
    const location = useLocation();
    const navigate = useNavigate();

    let info = "";
    if (location.state !== null) {
        info = location.state.info;
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChanges = e => {
        const { name, value } = e.target
        if (name === "username") {
            setUsername(value);
        }
        if (name === "password") {
            setPassword(value);
        }
    }

    const login = async e => {

        e.preventDefault();
        if (validate()) {

            const values = { Username: username, Password: password };
            const resp = await Login(values);
            if (resp.data.address === "notVerified") {
                alert("You are not verified yet");
            }
            else if (resp.data.token && resp.data.id) {
                localStorage.setItem('token' + resp.data.id, resp.data.token);
                navigate('/homepage', { state: { user: resp.data } });
            }
            else {
                alert("Login failed! Please try again");
            }
        }
    }
    let nameError = "";
    let passwordError = "";
    const validate = () => {

        if (!username) {
            nameError = "Name field is required";
            alert(nameError)
        }

        if (!password) {
            passwordError = "Password field is required";
            alert(passwordError)
        }
        if (nameError || passwordError) {
            return false;
        }
        return true;
    }

    const fbLogin = async (token) => {
        const fbresp = await Facebook({ Token: token });
        localStorage.setItem('token' + fbresp.data.id, fbresp.data.token);
        console.log(fbresp);
        navigate('/homepage', { state: { user: fbresp.data } });

    }

    return (
        <div>
            <div className="row mx-auto col-10 col-md-8 col-lg-6">
                <h2>
                    {info === 'Merchant' ? "You sent a request for validation" : ""}
                </h2>
                <h2 className={'text-center'}>Please, log in</h2><br /><br />
                <form className="row text-center" onSubmit={login} >
                    <div className="row">
                        <div className="col">
                            <input placeholder="Username" className="form-control" type="text" name='username' value={username} onChange={handleInputChanges} ></input><br /><br />
                        </div>
                        <div className="col">
                            <input placeholder="Password" className="form-control" type="password" name='password' value={password} onChange={handleInputChanges}></input><br /><br />
                        </div>
                        <div className="col">
                            <input type="submit" name='uloguj' value="Log in" onChange={handleInputChanges} className="btn btn-primary"></input><br />
                        </div>
                        <div className="col"><LoginSocialFacebook
                            appId={process.env.REACT_APP_CLIENT_ID}
                            onResolve={(response) => {
                                console.log(response);
                                fbLogin(response.data.accessToken);
                            }}
                            onReject={(error) => {
                                console.log(error);
                            }}
                        >
                            <FacebookLoginButton />
                        </LoginSocialFacebook></div>
                    </div>
                </form >
                <div className="col">
                    <button className="btn btn-outline-primary">
                        <a href='/register'>Create new account</a>
                    </button>
                </div>
                <div className="col">
                </div>
            </div>

            <br />
        </div >
    )
}
