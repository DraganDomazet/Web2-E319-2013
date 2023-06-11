import { UpdateUserProfile, AddImage, GetUser, GetImage } from "../services/UserService";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function UpdateUser() {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState(-1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    useEffect(() => {
        fillFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
    };

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
            setFirstName(value);
        }
        else if (name === "lastname") {
            setLastName(value);
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

    const fillFields = async (e) => {
        const response = await GetUser(location.state.user.id, config);
        const image = await GetImage(location.state.user.username);
        setImageUrl(image);

        const user = response.data;
        console.log("radi!!!");

        console.log(user);
        setUsername(user.username);

        setAddress(user.address);
        setEmail(user.email);
        setId(location.state.user.id);
        let date = (user.dateOfBirth + "").split('T')[0];
        setDateOfBirth(date);
        setFirstName(user.firstName);
        setLastName(user.firstName);

    }

    let validationError = "";

    const validate = () => {

        if (!username) {
            validationError = "Username field is required";
            alert(validationError)
        }

        if (!password) {
            validationError = "Password field is required";
            alert(validationError)
        }

        else if (password !== password2) {
            validationError = "Your paswords don't match!";
            alert(validationError)
        }

        if (!firstname) {
            validationError = "Name field is required";
            alert(validationError)
        }

        if (!lastname) {
            validationError = "Lastname field is required";
            alert(validationError)
        }

        if (!email) {
            validationError = "Email field is required";
            alert(validationError)
        }

        if (!address) {
            validationError = "Address field is required";
            alert(validationError)
        }

        if (validationError !== "") {
            return false;
        }
        return true;
    }


    const updateUser = async e => {

        e.preventDefault();
        if (validate()) {
            const values = { Id: id, Username: username, Password: password, DateOfBirth: dateOfBirth, FirstName: firstname, LastName: lastname, Email: email, Address: address, UserType: 'Customer', UserImage: imageUrl };
            const resp = await UpdateUserProfile(values);
            console.log(resp);

            if (file != null) {
                const response = AddImage(file, resp.data.username);
                console.log(response);
            }

            navigate('/homepage', { state: { user: resp.data, updated: true } });

        }
    }


    function handleFileSelect(event) {
        const file = event.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        // send formData to the server
        setFile(formData);
        setImageUrl(URL.createObjectURL(file));
    }

    return (
        <div className="jumbotron text-center">
            <h3>Register new user:</h3><br /><br />
            <form onSubmit={updateUser}>
                <div className="row">
                    <div className="col">
                        Username:<br/> <input placeholder="Username" type={"text"} name='username' value={username} onChange={handleInputChanges}  ></input><br />
                    </div>
                    <div className="form-group">
                        Password:<br /> <input placeholder="Password" type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br />
                    </div>
                    <div className="form-group">
                        Password:<br /> <input placeholder="Password" type="password" name='password2' value={password2} onChange={handleInputChanges}></input><br />
                    </div>
                    <div className="form-group">
                        First name:<br /> <input placeholder="First name" type="text" name='firstname' value={firstname} onChange={handleInputChanges}  ></input><br />
                    </div>
                    <div className="form-group">
                        Last name: <br /><input placeholder="Last name" type="text" name='lastname' value={lastname} onChange={handleInputChanges}  ></input><br />
                    </div>
                    <div className="form-group">
                        Email:<br /> <input placeholder="Email" type="text" name='email' value={email} onChange={handleInputChanges}  ></input><br />
                    </div>
                    <div className="form-group">
                        Date of Birth:<br /> <input style={{width: '190px'}} placeholder="Date of Birth" type="date" name="date" value={dateOfBirth} onChange={handleInputChanges}></input><br />
                    </div>
                    <div className="form-group">
                        Address: <br /><input placeholder="Address" type="text" name="address" value={address} onChange={handleInputChanges} ></input><br />
                    </div>
                    <div className="form-group">
                        Image: <br/><input placeholder="Image" type="file" onChange={handleFileSelect} />
                        <img src={imageUrl} height={150} width={150} alt=""/>
                    </div><br /><br /><br />

                    <div className="form-group">
                        <input type={"submit"} name='registruj' value={"Register"} onChange={handleInputChanges} className="btn btn-danger"></input>
                    </div>
                </div>
            </form >
            <br />
        </div >
    )

}