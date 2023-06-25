import axios from 'axios'
import { urlAddOrder, urlGetOrders, urlGetCustomerOrders, urlCancelOrder, urlGetMerchantOrders } from '../endpoints';


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

export const GetOrders = async (id, config) => {
    return await axios.get(urlGetMerchantOrders + `/${id}`, id, config);
}