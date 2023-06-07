import React, { useState } from "react";
import { LogIn } from "../services/UserService";
import * as ReactDOMClient from 'react-dom/client';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChanges = e => {
        const { name, value } = e.target
        if (name == "username") {
            setUsername(value);
        }
        if (name == "password") {
            setPassword(value);
        }
    }
    const [alertMessage, setAlert] = useState(<div></div>);

    const login = async e => {

        e.preventDefault();
        if (validate()) {

            const values = { Username: username, Password: password };
            const resp = await LogIn(values);
            console.log(resp);

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
        <div className="jumbotron text-center">
            <h2 className="bg-info">Please, log in :)</h2><br /><br />
                <form onSubmit={login} >
                    <label> Username : </label>&nbsp;<input type={"text"} name='username' value={username} onChange={handleInputChanges}  ></input><br /><br />

                    <label> Password : </label>&nbsp;<input type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br /><br />

                <input type={"submit"} name='uloguj' value={"Log in"} onChange={handleInputChanges} className="btn btn-primary"></input><br />
                </form>
                <br />
                <br />
            {alertMessage}
        </div>
    )
}