import React, { useState, useEffect } from "react";
import { GetAllArticles } from "../services/ProductService";
import { AddOrder } from "../services/OrderService";
import { useLocation, useNavigate } from 'react-router-dom';


export default function NewOrder() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [elements, setElements] = useState([]);
    const [listOfArticles, setList] = useState([]);
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [am, setAm] = useState(0);



    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id), }
    };

    const tableArticles = async (e) => {
        const resp = await GetAllArticles(config);
        console.log(resp);
        setElements(resp.data);

    }

    useEffect(() => {
        tableArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleInputChanges = e => {
        const { name, value } = e.target
        if (name === "address") {
            setAddress(value);
        }
        if (name === "comment") {
            setComment(value);
        }

    }

    let validationError = "";

    const valid = () => {
        if (address === '') {
            validationError = "You have to write your address!";
            alert(validationError);
        }
        else if (comment === "") {
            validationError = "You have to type some comment!";
            alert(validationError);
        }
        else if (listOfArticles.length === 0) {
            validationError = "Order something! You article list is empty!";
            alert(validationError);
        }

        if (validationError) {
            return false;
        }
        return true;
    }

    const createOrder = async (event, element) => {

        event.preventDefault();

        const config = {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
        };
        const Order = { Address: address, Comment: comment, UserId: location.state.user.id, Products: listOfArticles }
        if (valid()) {
            const resp = await AddOrder(Order, config);
            console.log(resp);
            if (resp.data.id === -1 || resp.data === '') {
                validationError = "You can not order this articles!";
                alert(validationError);
            }
            else {
                console.log("Successfully!!!");
                console.log(resp.data);
                tableArticles();
                navigate("/homepage", { state: { user: location.state.user } })
            }
        }

    }

    const addQuantity = (event, element) => {
        event.preventDefault();
        var list = listOfArticles;
        if (element.amount <= 0) {
            validationError = "Can not order 0 articles!";
            alert(validationError);
        }
        else if (element.amount >= am) {
            const ArticleNew = { id: element.id, name: element.name, IndividualPrice: element.individualPrice, amount: am, description: element.description, ProductImageUrl: element.productImageUrl, merchantID: location.state.user.id }
            list.push(ArticleNew);
            setList(list);
            console.log(listOfArticles);
        }
        if (validationError) {
            return false;
        }
        
        return true;
    }

    const addOnList = (event, element) => {
        event.preventDefault();
        console.log("https://localhost:7241/api/products/get-image/" + element.id);
        const ArticleNew = { id: element.id, name: element.name, IndividualPrice: element.price, amount: element.amount, description: element.description, ProductImageUrl: element.productImageUrl, merchantID: location.state.user.id }
        setList(ArticleNew);
        addQuantity(event, element);
    }

    const elementi = elements.map(element => <tr key={element.name}>
        <td>
            {element.name}</td><td >{element.individualPrice}</td><td >
            {element.amount}</td><td>{element.description}</td>
        <td><img src={"https://localhost:7241/api/products/get-image/" + element.id} height={50} width={50} alt="" /></td>
        <td><input type={"number"} onChange={(evt) => { setAm(evt.target.value) }}  ></input></td>
        <td><input type={"button"} className="btn btn-outline-success" onClick={(event) => addOnList(event, element)} value={"Add product to cart"}></input></td>
    </tr>);


    return (
        <div>
            <div className="container text-center">
                <div><strong><h1>Available Products</h1></strong></div>
                <table className="table tab-content table-active">
                    <tbody key="tbody">
                        <tr key="first">
                            <td ><b>Name</b></td>
                            <td><b>Price</b></td>
                            <td ><b>Quantity</b></td>
                            <td><b>Description</b></td>
                            <td><b>Image</b></td>
                            <td><b>Order</b></td>
                            <td><b>Select product to buy</b></td>
                        </tr>
                        {elementi}
                    </tbody>
                </table>
                <br /><br />
                {/* <div><h2>{orderText}</h2></div> */}
                
                <div className="mb-3"><input className="form-control" placeholder="Address" type={"text"} name='address' value={address} onChange={handleInputChanges} ></input></div><br />
                <div><input className="form-control" placeholder="Comment" type={"text"} name='comment' value={comment} onChange={handleInputChanges} ></input></div><br />
                <input type={"submit"} className="btn btn-outline-danger" name='poruci' value={"Create Order"} onClick={createOrder}></input><br />
            </div>


        </div>

    )

}