import React, { useState, useEffect } from "react";
import { GetCustomerOrders, CancelOrder } from "../services/OrderService";
import { useLocation } from 'react-router-dom';


export default function OldOrder() {
    const location = useLocation();
    const [elements, setElements] = useState([]);

    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
    };

    const OrdersTableFill = async (e) => {
        const resp = await GetCustomerOrders(location.state.user.id, config);
        console.log(resp);
        setElements(resp.data)
        console.log(elements);
    }

    useEffect(() => {
        OrdersTableFill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const otkazi = async (event, element) => {

        event.preventDefault();
        const resp = await CancelOrder(element, config);
        console.log(resp);
        if (resp.data === false) {
            alert("Cancelacion time has expired!");
        }
        else {
            OrdersTableFill();
        }
    }
    const elementi = elements.map(element => <tr key={element.timeOfDelivery}>
        <td>{element.price}</td>
        <td>{element.timeOfDelivery.split('T')[0] === "0001-01-01" ? "Order not confirmed yet!" : element.timeOfDelivery.split('T')[0] + " at " + element.timeOfDelivery.split('T')[1]}</td>
        <td>{element.comment}</td><td>{element.deliveryAddress}</td>
        <td><input type={"button"} className="btn btn-link" onClick={(event) => otkazi(event, element)} value="Cancel Order"></input></td>
    </tr>);
    return (
        <div>
            <div className="container text-center">
                <div className="alert alert-warning"><strong><h1>Orders</h1></strong></div>
                <table className="table table-bordered">
                    <tbody key="tbody">


                    <tr>
                        <td><b>Final price</b></td>
                        <td><b>Delivery time</b></td>
                        <td><b>Comment</b></td>
                        <td><b>Address</b></td>
                        <td>Cancel Order</td>
                    </tr>
                    {elementi}
                    </tbody>
                </table></div>
        </div>
    )
}