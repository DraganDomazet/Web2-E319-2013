import React, { useState } from "react";
import { AddImage, EditProduct } from "../services/ProductService";
import { useLocation, useNavigate } from 'react-router-dom';


export default function UpdateProduct() {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState(location.state.product.name);
    const [price, setPrice] = useState(location.state.product.individualPrice);
    const [amount, setAmount] = useState(location.state.product.amount);
    const [description, setDescription] = useState(location.state.product.description);

    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);



    const handleInputChanges = e => {
        const { name, value } = e.target
        if (name === "name") {
            setName(value);
        }
        if (name === "price") {
            setPrice(value);
        }
        if (name === "amount") {
            setAmount(value);
        }
        if (name === "description") {
            setDescription(value);
        }
    }

    let validationError = "";

    const validate = () => {
        if (name === '') {
            validationError = "You have to type name of article!";
            alert(validationError);
        }

        else if (description === '') {
            validationError = "You have to type description of article!";
            alert(validationError);
        }

        else if (amount === 0) {
            validationError = "Can not have 0 articles!";
            alert(validationError);
        }
        if (price < 0) {
            validationError = "Price is positive number";
            alert(validationError);
        }
        else if (!imageUrl) {
            validationError = "Image is required";
            alert(validationError);
        }
        if (validationError) {
            return false;
        }
        return true;
    }

    const edit = async e => {
        e.preventDefault();
        if (validate()) {
            const config = {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id) }
            };
            const Product = { Name: name, Description: description, Amount: amount, Price: price, MerchantId: location.state.user.id, ProductImageUrl: imageUrl.name };
            const resp = await EditProduct(Product, config);
            if (resp.data !== "") {
                console.log("Radi za product!");
                navigate("/homepage", { state: { user: location.state.user, product: true } });
            }
            else {
                //isto
            }
            if (file != null) {
                const response = AddImage(file, resp.data.id, config);
                console.log(response);
            }
        }



    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        console.log(file);
        setImageUrl(file);
        const formData = new FormData();
        formData.append("image", file);
        // send formData to the server
        setFile(formData);
        setImageUrl(file);
    }

    return (
        <div className="jumbotron text-center">
            <div><strong><h3>Update product</h3></strong></div><br />
            <form onSubmit={edit}>
                <div className="row">
                    <div className="form-group">
                        <input placeholder="Product name" value={name} type="text" name="name" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Price" type="number" value={price}  name="price" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Quantity" type="number" value={amount} name="amount" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Desciption" type="text" value={description}  name="description" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input type="file" onChange={handleFileSelect} style={{ "marginLeft": "110px" }} /><br /><br />
                    </div>
                    <div className="form-group">
                        {imageUrl && <img src={URL.createObjectURL(imageUrl)} height={300} width={300} alt="" />}<br /><br />
                    </div>
                    <div className="form-group">
                        <input type={"submit"} name='update' value="Update product" onChange={handleInputChanges} className="btn btn-outline-success"></input><br />
                    </div>
                </div>
            </form >

        </div >
    )
}