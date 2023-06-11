import React, { useState } from "react";
import { AddArticle, AddImage } from "../services/ProductService";
import { useLocation } from 'react-router-dom';


export default function NewProduct() {
    const location = useLocation();

    const [naziv, setNaziv] = useState('');
    const [cena, setCena] = useState(0);
    const [kolicina, setKolicina] = useState(0);
    const [opis, setOpis] = useState('');

    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);



    const handleInputChanges = e => {
        const { name, value } = e.target
        if (name === "naziv") {
            setNaziv(value);
        }
        if (name === "cena") {
            setCena(value);
        }
        if (name === "kolicina") {
            setKolicina(value);
        }
        if (name === "opis") {
            setOpis(value);
        }
    }

    let validationError = "";

    const validate = () => {
        if (naziv === '') {
            validationError = "You have to type name of article!";
            alert(validationError);
        }

        else if (opis === '') {
            validationError = "You have to type description of article!";
            alert(validationError);
        }

        else if (kolicina === 0) {
            validationError = "Can not have 0 articles!";
            alert(validationError);
        }
        if (cena < 0) {
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

    const add = async e => {
        e.preventDefault();
        if (validate()) {
            const config = {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id)}
            };
            const Article = { Name: naziv, Description: opis, Amount: kolicina, Price: cena, MerchantId: location.state.user.id, ProductImageUrl: imageUrl.name };
            const resp = await AddArticle(Article, config);
            console.log(resp);
            if (resp.data !== "") {
                console.log("Radi za product!");
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
            <div><strong><h3>NEW ARTICLE</h3></strong></div><br />
            <form onSubmit={add}>
                <div className="row">
                    <div className="form-group">
                        <input placeholder="Product name" type="text" name="naziv" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Price" type="number" name="cena" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Quantity" type="number" name="kolicina" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input placeholder="Desciption" type="text" name="opis" onChange={handleInputChanges}></input><br /><br />
                    </div>
                    <div className="form-group">
                        <input type="file" onChange={handleFileSelect} style={{ "marginLeft": "110px" }} /><br /><br />
                    </div>
                    <div className="form-group">
                        {imageUrl && <img src={URL.createObjectURL(imageUrl)} height={300} width={300} alt="" />}<br /><br />
                    </div>
                    <div className="form-group">
                        <input type={"submit"} name='addnes' value="Add new product" onChange={handleInputChanges} className="btn btn-outline-success"></input><br />
                    </div>
                </div>
            </form >

        </div >
    )
}