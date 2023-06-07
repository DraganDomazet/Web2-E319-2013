import axios from 'axios'

export const LogIn = async (UserLoginDto) => {
    return await axios.post('https://localhost:7241' + '/api/users/login', UserLoginDto);
}