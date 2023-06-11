import axios from 'axios'
import { urlLogin, urlRegister, urlUpdateUser, urlGetUser, urlGetMerchantsRequests } from '../endpoints';
import { urlVerify, urluploadImage, urlDecline, urlImage, urlFacebookLogin } from '../endpoints';


export const Login = async (UserLoginDto) => {
    return await axios.post(urlLogin, UserLoginDto);
}

export const Facebook = async (UserLoginDto) => {
    return await axios.post(urlFacebookLogin, UserLoginDto);
}

export const RegisterUser = async (UserDto) => {
    return await axios.post(urlRegister, UserDto);
}

export const UpdateUserProfile = async (UserUpdateDto) => {
    return await axios.put(urlUpdateUser, UserUpdateDto)
}

export const GetUser = async (id, config) => {
    return await axios.get(urlGetUser + `/${id}`, config);
}

export const AddImage = async (File, id) => {
    return await axios.post(urluploadImage + `/${id}`, File);
}

export const GetMerchants = async (config) => {
    return await axios.get(urlGetMerchantsRequests, config);
}

export const Verificate = async (UserDto, config) => {
    return await axios.put(urlVerify, UserDto, config);
}

export const Decline = async (User, config) => {
    return await axios.post(urlDecline, User, config);
}

export const GetImage = (id) => {
    return urlImage + `/${id}`;
};
