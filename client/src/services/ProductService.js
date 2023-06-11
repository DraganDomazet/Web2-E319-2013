import axios from 'axios'

import { urlAddProduct, urlUploadImage, urlGetProducts } from '../endpoints';


export const AddArticle = async (Article, config) => {
    return await axios.post(urlAddProduct, Article, config)
}

export const AddImage = async (File, id, config) => {
    return await axios.post(urlUploadImage + `/${id}`, File, config);
}

export const GetAllArticles = async (config) => {
    return await axios.get(urlGetProducts, config);
}
