import React, { useState, useEffect } from "react";
import { DeleteProduct, MerchantProducts } from "../services/ProductService";
import { useLocation, useNavigate } from 'react-router-dom';

// import EditArticleFunction from "./EditArticle";

export default function NewOrder(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [elements, setElements] = useState([]);


    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
    };

    const tableArticles = async (e) => {
        const resp = await MerchantProducts(location.state.user.id, config);
        setElements(resp.data);
    }

    useEffect(() => {
        tableArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const obrisi = async (event, element) => {

        event.preventDefault();
        const res = await DeleteProduct(element.id, config);
        console.log(res);
        tableArticles();
    }

    const edit = async (event, element) => {

        event.preventDefault();
        navigate("/updateproduct", { state: { user: location.state.user, product: element } });

        //dodati navigaciju
    }

    const elementi = elements.map(element => <tr key={element.id}><td>
        {element.name}</td><td >{element.individualPrice}</td><td >
            {element.amount}</td><td>{element.description}</td>
        <td><img src={"https://localhost:7241/api/products/get-image/" + element.id} height={100} width={100} alt="" /></td>
        <td><input type={"button"} className="btn btn-link" onClick={(event) => obrisi(event, element)} value={"Delete"}></input></td>
        <td><input type={"button"} className="btn btn-link" onClick={(event) => edit(event, element)} value={"Edit"}></input></td>
    </tr>);
    return (
        <div>
            <div className="jumbotron text-center">
                <div><strong><h1>Products that you have added:</h1></strong></div>
                <table className="table table-bordered">
                    <tbody key="tbody">
                    <tr>
                        <td ><b>Name</b></td>
                        <td><b>Price</b></td>
                        <td ><b>Amount</b></td>
                        <td><b>Description</b></td>
                        <td><b>Image</b></td>
                        <td><b>Delete</b></td>
                    </tr>
                    {elementi}
                    </tbody>
                </table></div>
        </div>
    )

}