import '../App.css';
import { useLocation } from 'react-router-dom';
import CustomerPage from './CustomerPage';
import AdminPage from './AdminPage';
import MerchantPage from './MerchantPage';
import { Routes, Route } from 'react-router-dom'

export default function HomePage() {
    const location = useLocation();

    if (location.state.user.userType === 2) {
        return (
            <Routes>
                <Route path="/" element={<CustomerPage user={location.state.user} />} />
            </Routes>
        )
    }
    else if (location.state.user.userType === 0) {
        return (
            <Routes>
                <Route path="/" element={<AdminPage user={location.state.user} />} />
            </Routes>
        )
    }

    else if (location.state.user.userType === 1) {
        return (
            <Routes>
                <Route path="/" element={<MerchantPage user={location.state.user} />} />
            </Routes>
        )
    }
}