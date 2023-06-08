import './App.css';
import LogIn from "./components/LogIn";
import Register from './components/Register';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom'


function App() {
    return (
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/' element={<LogIn />} />
        </Routes>
    );
}

export default App;
