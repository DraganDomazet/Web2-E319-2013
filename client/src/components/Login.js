import React, { useState } from "react";
import { Login } from "../services/UserService";
import Register from "./Register";
import * as ReactDOMClient from 'react-dom/client';
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
            navigate('homepage', { state: { user: resp.data }});

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
    const register =  e => {

        e.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<Register></Register>);
    }

    return (
        <div className="jumbotron text-center">
            <h2 className="bg-info">Please, log in :)</h2><br /><br />
                <form onSubmit={login} >
                    <label> Username : </label>&nbsp;<input type={"text"} name='username' value={username} onChange={handleInputChanges}  ></input><br /><br />

                    <label> Password : </label>&nbsp;<input type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br /><br />

                <input type={"submit"} name='uloguj' value={"Log in"} onChange={handleInputChanges} className="btn btn-primary"></input><br />
                </form>
                <br />
            <input type={"submit"} name='registruj' value={"Register"} onClick={register} className="btn btn-primary"></input>
                <br />
        </div>
    )
}