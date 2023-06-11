import React, { useState, useEffect } from "react";
import { GetMerchants, Verificate, Decline } from "../services/UserService";
import { useLocation } from 'react-router-dom';


export default function UserRequest(props) {
    const location = useLocation();
    const [users, setUsers] = useState([]);

    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
    };

    const getUsers = async () => {
        const resp = await GetMerchants(config);
        console.log(resp);
        if (resp.data !== users) {
            setUsers(resp.data);
        }
    }


    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const verificateUser = async (User) => {
        const resp2 = await Verificate(User, config);
        console.log(resp2);
        if (resp2.data !== '') {
            getUsers();
        }
    }

    const declineUser = async (User) => {
        const resp2 = await Decline(User, config);
        console.log(resp2);
        getUsers();
    }

    const odobri = (e, element) => {
        e.preventDefault()
        const User = { Username: element.username, Password: element.password, UserImage:element.userImage, Email: element.email, Id: element.id, FirstName: element.firstName, LastName: element.lastName, DateOfBirth: element.dateOfBirth, Address: element.address, UserType: element.userType }
        verificateUser(User);
    }

    const odbij = (e, element) => {
        e.preventDefault()
        const User = { Username: element.username, Password: element.password, UserImage: element.userImage, Email: element.email, Id: element.id, FirstName: element.firstName, LastName: element.lastName, DateOfBirth: element.dateOfBirth, Address: element.address, UserType: element.userType }
        declineUser(User);
    }



    const elementi = users.map(element =>
    <tr key={element.username}>
        <td>
            {element.username}</td>
        <td>{element.email}</td><td >
            {element.dateOfBirth}</td>
        <td>{element.address}</td>
            <td><img src={"https://localhost:7241/api/users/get-image/" + element.username} height={150} width={150} alt="" /></td>
        <td ><input type={"button"} className="btn btn-link" onClick={(e) => odobri(e, element)} value={"Confirm"}></input></td>
        <td><input type={"button"} className="btn btn-link" onClick={(e) => odbij(e, element)} value={"Decline"}></input></td>
    </tr>);

    return (
        <div>
            <div className="container text-center">
                <div className="alert alert-info"><strong><h1>Users</h1></strong></div>
                <table className="table table-bordered">
                    <tbody key="tbody">
                        <tr>
                            <td ><b>Username</b></td>
                            <td><b>Email</b></td>
                            <td ><b>Date of birth</b></td>
                            <td><b>Address</b></td>
                            <td><b>Image</b></td>
                            <td><b>Confirm</b></td>
                            <td><b>Decline</b></td>
                        </tr>
                        {elementi}
                    </tbody></table></div>

        </div>
    )
}