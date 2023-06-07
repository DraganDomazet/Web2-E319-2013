import axios from 'axios'
import { urlLogin } from '../endpoints';
import { urlRegister } from '../endpoints';


export const LogIn = async (UserLoginDto) => {
    return await axios.post(urlLogin, UserLoginDto);
}

export const RegisterUser = async (UserDto) => {
    return await axios.post(urlRegister, UserDto);
}

export const AddImage = async (File, id) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/upload-image/${id}`, File);
}