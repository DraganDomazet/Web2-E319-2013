import axios from 'axios'

export const AddOrder = async (Order, config) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/add-order`, Order, config);
}

export const GetAllOrders = async (config) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/get-all-orders`, config);
}