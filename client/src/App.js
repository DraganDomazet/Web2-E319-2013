import './App.css';
import LogIn from "./components/LogIn";
import Register from './components/Register';
import HomePage from './components/HomePage';
import UpdateUser from './components/UpdateUser';
import GetMerchantRequests from './components/GetMerchantRequests';
import NewProduct from './components/NewProduct';
import AddOrder from './components/AddOrder';
import CustomerPage from './components/CustomerPage';


import { Routes, Route } from 'react-router-dom'


function App() {
    return (
        <Routes>
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<Register />} />
            <Route path='/homepage/*' element={<HomePage />} />
            <Route path='/homepage/updateprofile' element={<UpdateUser />} />
            <Route path='/getmerchants' element={<GetMerchantRequests />} />
            <Route path="/addproduct" element={<NewProduct />} />
            <Route path="/customerpage" element={<CustomerPage />} />
            <Route path="/addorder" element={<AddOrder />} />

            

            <Route path='/' element={<LogIn />} />
        </Routes>
    );
}

export default App;
