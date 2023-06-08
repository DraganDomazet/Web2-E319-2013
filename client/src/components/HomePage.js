import '../App.css';
import { useLocation } from 'react-router-dom';
import CustomerPage from './CustomerPage';
import UpdateUser from './UpdateUser';

import { Routes, Route } from 'react-router-dom'

export default function HomePage(props) {
    const location = useLocation();

    if (location.state.user.userType === 1) {
        return (
            <Routes>
                <Route path="/" element={<CustomerPage />} />
                <Route path='/updateprofile' element={<UpdateUser user={props.user} />} />
            </Routes>
        )
    }
}