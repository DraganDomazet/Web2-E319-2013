import React, { useState } from "react";
import { Login } from "../services/UserService";
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const navigate = useNavigate();

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
            console.log(resp);
            navigate('homepage', { state: { user: resp.data } });

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

    return (
        <div>
            <div className="row mx-auto col-10 col-md-8 col-lg-6">
                <h2 className={'text-center'}>Please, log in :)</h2><br /><br />
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
                    </div>
                </form >
                <div className="col">
                <button className="btn btn-outline-primary">
                    <a href='/register'>Create new account</a>
                </button>
            </div>
            </div>
            
            <br />
        </div >
    )
}