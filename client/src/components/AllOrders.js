import { GetAllOrders } from "../services/OrderService";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function AllOrders(props) {
    const location = useLocation();

    const [elements, setElements] = useState([]);
    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
    };

    const OrdersTableFill = async (e) => {
        const resp = await GetAllOrders(config);
        console.log("resp:" + resp);
        setElements(resp.data)
        console.log("staro");
    }

    useEffect(() => {
        OrdersTableFill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const elementi = elements.map(element =>
        <tr key={element.timeOfDelivery}>
            <td>{element.price}</td>
            <td>{element.timeOfDelivery.split('T')[0]}</td>
            <td>{element.timeOfDelivery.split('T')[1].split('.')[0]}</td>
            <td>{element.comment}</td>
            <td>{element.deliveryAddress}</td>
        </tr>);

    return (
        <div>
            <div className="container text-center">
                <div><strong><h1>All orders</h1></strong></div>
                <table className="table table-bordered">
                    <tbody key="tbody">
                        <tr key="row">
                            <td><b>Final price</b></td>
                            <td><b>Delivery date</b></td>
                            <td><b>Delivery time</b></td>
                            <td><b>Comment</b></td>
                            <td><b>Address</b></td>
                        </tr>
                        {elementi}
                    </tbody>
                </table>
            </div>
        </div>
    )
}