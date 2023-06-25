import axios from 'axios'
import { urlAddOrder, urlGetOrders, urlGetCustomerOrders, urlCancelOrder } from '../endpoints';


export const AddOrder = async (Order, config) => {
    return await axios.post(urlAddOrder, Order, config);
}

export const GetAllOrders = async (config) => {
    return await axios.get(urlGetOrders, config);
}

export const GetCustomerOrders = async (id, config) => {
    return await axios.get(urlGetCustomerOrders + `/${id}`, id, config);
}

export const CancelOrder = async (element, config) => {
    return await axios.put(urlCancelOrder, element, config);
}