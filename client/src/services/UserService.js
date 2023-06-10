import axios from 'axios'
import { urlLogin } from '../endpoints';
import { urlRegister } from '../endpoints';
import { urlUpdateUser } from '../endpoints';
import { urlGetUser } from '../endpoints';

export const Login = async (UserLoginDto) => {
    return await axios.post(urlLogin, UserLoginDto);
}

export const RegisterUser = async (UserDto) => {
    return await axios.post(urlRegister, UserDto);
}

export const UpdateUserProfile = async (UserUpdateDto) => {
    return await axios.put(urlUpdateUser, UserUpdateDto)
}

export const GetUser = async (id) => {
    return await axios.get(urlGetUser + `/${id}`);
}

export const AddImage = async (File, id) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/upload-image/${id}`, File);
}