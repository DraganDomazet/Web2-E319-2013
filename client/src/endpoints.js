const baseUrl = process.env.REACT_APP_API_URL;

export const urlLogin = `${baseUrl}/api/users/login`
export const urlFacebookLogin = `${baseUrl}/api/users/facebook-login`
export const urlRegister = `${baseUrl}/api/users/register`
export const urlUpdateUser = `${baseUrl}/api/users/update`
export const urluploadImage = `${baseUrl}/api/users/upload-image`
export const urlGetUser = `${baseUrl}/api/users/get-user`
export const urlGetMerchantsRequests = `${baseUrl}/api/users/get-merchants`
export const urlVerify = `${baseUrl}/api/users/verify`
export const urlDecline = `${baseUrl}/api/users/decline`
export const urlImage = `${baseUrl}/api/users/get-image`
export const urlAddProduct = `${baseUrl}/api/products/add`
export const urlGetProducts = `${baseUrl}/api/products/get-all`
export const urlUploadImage = `${baseUrl}/api/products/upload-image`
export const urlAddOrder = `${baseUrl}/api/orders/add-order`
export const urlGetOrders = `${baseUrl}/api/orders/get-all-orders`
export const urlGetCustomerOrders = `${baseUrl}/api/orders/get-user-orders`
export const urlCancelOrder = `${baseUrl}/api/orders/cancel-order`
export const urlAcceptOrder = `${baseUrl}/api/orders/accept-order`
export const urlGetMerchantOrders = `${baseUrl}/api/orders/merchant`









