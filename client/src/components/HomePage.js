import '../App.css';
import { useLocation } from 'react-router-dom';
import CustomerPage from './CustomerPage';

import { Routes, Route } from 'react-router-dom'

export default function HomePage() {
    const location = useLocation();

    if (location.state.user.userType === 2) {
        return (
            <Routes>
                <Route path="/" element={<CustomerPage user={location.state.user.user} />} />
            </Routes>
        )
    }
}