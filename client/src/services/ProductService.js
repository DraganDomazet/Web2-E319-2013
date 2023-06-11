import axios from 'axios'

export const AddArticle = async (Article, config) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/products/add`, Article, config)
}

export const AddImage = async (File, id, config) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/products/upload-image/${id}`, File, config);
}

export const GetAllArticles = async (config) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/products/get-all`, config);
}
