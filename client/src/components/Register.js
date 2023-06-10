import { RegisterUser, AddImage } from "../services/UserService";
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstname, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState("");

    const [file, setFile] = useState(null);
    const handleInputChanges = e => {
        const { name, value } = e.target
        if (name === "username") {
            setUsername(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
        else if (name === "password2") {
            setPassword2(value);
        }
        else if (name === "firstname") {
            setName(value);
        }
        else if (name === "lastname") {
            setLastname(value);
        }
        else if (name === "email") {
            setEmail(value);
        }

        else if (name === "address") {
            setAddress(value);
        }
        else if (name === "uloga") {
            setAddress(value);
        }
    }
    const uloga = useRef();
    const dateInputRef = useRef(null);
    const register = async e => {

        e.preventDefault();
        if (validate()) {
            console.log(dateInputRef.current.value);
            console.log(username + "/" + password + "/" + firstname + "/" + email + "/" + address + "/" + dateInputRef.current.value + "/" + uloga.current.value);

            const values = { Username: username, Password: password, FirstName: firstname, LastName: lastname, Email: email, Address: address, UserType: uloga.current.value, DateOfBirth: dateInputRef.current.value, ImageUrl: imageUrl };
            const resp = await RegisterUser(values);
            console.log(resp);

            if (file != null) {
                const response = AddImage(file, resp.data.username);
                console.log(response);
            }

            navigate('/login');

        }
    }

    let usernameError = "";
    let passwordError = "";
    let nameError = "";
    let lastnameError = "";
    let addressError = "";
    let birtdayError = "";
    let emailError = "";

    const validate = () => {

        if (!username) {
            usernameError = "Username field is required";
            alert(usernameError)
        }

        if (!password) {
            passwordError = "Password field is required";
            alert(passwordError)
        }

        else if (password !== password2) {
            passwordError = "Your paswords don't match!";
            alert(passwordError)
        }

        if (!firstname) {
            nameError = "Name field is required";
            alert(nameError)
        }

        if (!lastname) {
            lastnameError = "Lastname field is required";
            alert(lastnameError)
        }

        if (!email) {
            emailError = "Email field is required";
            alert(emailError)
        }

        if (!address) {
            addressError = "Address field is required";
            alert(addressError)
        }

        if (nameError || passwordError || usernameError || lastnameError || birtdayError || emailError || addressError) {
            return false;
        }
        return true;
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        // send formData to the server
        setFile(formData);
        setImageUrl(file.name);
    }


    return (
        <div className="jumbotron text-center">
            <h3>Register new user:</h3><br /><br />
            <form onSubmit={register}>
                <div className="row">
                    <div className="col">
                        <input placeholder="Username" type={"text"} name='username' value={username} onChange={handleInputChanges}  ></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Password" type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Password" type="password" name='password2' value={password2} onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="First name" type="text" name='firstname' value={firstname} onChange={handleInputChanges}  ></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Last name" type="text" name='lastname' value={lastname} onChange={handleInputChanges}  ></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Email" type="text" name='email' value={email} onChange={handleInputChanges}  ></input><br /><br />
                    </div>
                    <div className="form-group"> <input placeholder="Date of Birth" type="date" name="date" ref={dateInputRef}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Address" type="text" name="address" value={address} onChange={handleInputChanges} ></input><br /><br />
                    </div>
                    <div className="form-group">
                        <select placeholder="User Type" ref={uloga} >
                            <option value={'Customer'}>Customer</option>
                            <option value={'Merchant'}>Merchnat</option>
                            <option value={'Admin'}>Admin</option>
                        </select><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Image" type="file" onChange={handleFileSelect} />
                    </div><br /><br />

                    <div className="form-group">
                    <input type={"submit"} name='registruj' value={"Register"} onChange={handleInputChanges} className="btn btn-primary"></input><br />
                    </div>
                </div>
            </form >
            <br />
        </div >
    )

}