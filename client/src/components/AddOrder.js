import React, { useState, useEffect, useRef } from "react";
import { GetAllArticles } from "../services/ProductService";
import { AddOrder } from "../services/OrderService";
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Geocode from "react-geocode";


export default function NewOrder() {
    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("rs");
    const location = useLocation();
    const navigate = useNavigate();

    const [elements, setElements] = useState([]);
    const [listOfArticles, setList] = useState([]);
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [am, setAm] = useState(0);
    const [cartInfo, setCartInfo] = useState('Cart is empty!');
    const autocompleteRef = useRef(null);

    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
    };

    const tableArticles = async (e) => {
        const resp = await GetAllArticles(config);
        setElements(resp.data);
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GEOCODE_KEY,
        language: "en",
        libraries: ["places"]
    });

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
            if (resp.data.id === -1 || resp.data === '') {
                validationError = "You can not order this articles!";
                alert(validationError);
            }
            else {
                tableArticles();
                navigate("/homepage", { state: { user: location.state.user, order: true } })
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
            setCartInfo("You have added " + listOfArticles.length + " products to cart");
            return true;
        }
        else {
            validationError = "Amount of available products is exceeded!";
            alert(validationError);
        }

    }

    const addOnList = (event, element) => {
        event.preventDefault();
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

    // const handlePayPal = () => {
    //     navigate('/review');
    // }

    const handlePayPalPayment = async (data, actions) => {
        // const temp = cartContext.cartItems.map((item) => ({
        //     productId: item.id,
        //     productAmount: item.quantity,
        // }));
        // const price = await buyerService.getTotalPrice(temp);

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "11.23",
                        currency_code: "USD",
                    },
                },
            ],
        });
    };

    const handleApprovement = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            console.log("Radi!!!!");
            // const items = cartContext.cartItems.map((item) => ({
            //     productId: item.id,
            //     productAmount: item.quantity,
            // }));

            // const createOrderValues = {
            //     items,
            //     deliveryAddress: cartContext.address,
            //     comment: cartContext.comment,
            // };

            // try {
            //     await buyerService.createOrder(createOrderValues);
            //     cartContext.clearCart();
            //     cartContext.setCartAddress("");
            //     cartContext.setCartComment("");
            //     navigator("/previous-orders");
            // } catch (error) {
            //     if (error.response) alert(error.response.data.Exception);
            // }
        });
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

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
                <div><h2 style={{ color: `red` }}>{cartInfo}</h2></div><br/>

                <div className="mb-3 row justify-content-center">
                    <div className="col-4">
                        <Autocomplete
                            onLoad={(autocomplete) => {
                                autocompleteRef.current = autocomplete;
                            }}
                            onPlaceChanged={() => {
                                const selectedPlace = autocompleteRef.current.getPlace();
                                if (selectedPlace && selectedPlace.formatted_address) {
                                    setAddress(selectedPlace.formatted_address);
                                }
                            }}
                        >

                            <input
                                placeholder="Insert your address"
                                type="text"
                                id="address"
                                required
                                className="form-control"
                            />

                        </Autocomplete>
                    </div>
                    <div className="col-4"><input className="form-control" placeholder="Comment" type={"text"} name='comment' value={comment} onChange={handleInputChanges} ></input></div><br />
                    <br />
                </div>
                <input type={"submit"} className="buttonPay" name='poruci' value={"Cash on arrival"} onClick={createOrder}></input><br />
                <div className="row justify-content-center">
                <div className="col-3">
                    <PayPalScriptProvider
                        options={{ "client-id": "AZ6--ACQKvkCHEmfLHc01tiJrlF6_zP86RC2zKr8GpchbnmAN_wHBhZMCRSMi5KrSivSw45bMQ9L9w_6" }}
                    >
                        <PayPalButtons
                            style={{ label: "checkout" }}
                            createOrder={handlePayPalPayment}
                            onApprove={handleApprovement}
                        />
                    </PayPalScriptProvider>
                </div>
                </div>
            </div>


        </div>

    )

}