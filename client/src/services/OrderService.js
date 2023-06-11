import axios from 'axios'
import { urlAddOrder, urlGetOrders } from '../endpoints';


export const AddOrder = async (Order, config) => {
    return await axios.post(urlAddOrder, Order, config);
}

export const GetAllOrders = async (config) => {
    return await axios.get(urlGetOrders, config);
}