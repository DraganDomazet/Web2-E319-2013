import axios from 'axios'

import { urlAddProduct, urlUploadImage, urlGetProducts } from '../endpoints';


export const AddProduct = async (Product, config) => {
    return await axios.post(urlAddProduct, Product, config)
}

export const EditProduct = async (Article, config) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/products/update-product`, Article, config)
}

export const DeleteProduct = async (id, config) => {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/delete-product`, id, config)
}

export const AddImage = async (File, id, config) => {
    return await axios.post(urlUploadImage + `/${id}`, File, config);
}

export const GetAllArticles = async (config) => {
    return await axios.get(urlGetProducts, config);
}

export const MerchantProducts = async (id, config) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/products/merchant-products/${id}`, config);
}

