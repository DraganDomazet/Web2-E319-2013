import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomerPage(props) {
    const location = useLocation();

    const navigate = useNavigate();
    const handleClick = async e => {
        navigate('updateprofile', { state: { user: location.state.user } });
    }
    const addProduct = async e => {
        navigate('/addproduct', { state: { user: location.state.user } });
    }

    return (
        <div className="row mx-auto col-10 col-md-8 col-lg-6">
            <h1>You logged in as Merchant {location.state.user.username}!</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <button className="btn btn-outline-danger" onClick={handleClick}>Update profile</button>
                    </li>
                    <li className="list-group-item">
                        <button className="btn btn-outline-primary" onClick={addProduct}>Add product</button>
                    </li>
                </ul>
        </div>
    )
}
