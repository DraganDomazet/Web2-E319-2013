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

    const showProducts = async e => {
        navigate('/showProducts', { state: { user: location.state.user } });
    }

    const showOrdersMap = async e => {
        navigate('/ordersMap', { state: { user: location.state.user } });
    }


    return (
        <div className="jumbotron text-center">
            <h1>You logged in as Merchant {location.state.user.username}!</h1>
            <h1>{location.state.product ? "You added product" : ""}</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-outline-danger custom" onClick={handleClick}>Update profile</button>
                </li>
                <li className="list-group-item">
                    <button className="btn btn-outline-primary custom" onClick={addProduct}>Add product</button>
                </li>
                <li className="list-group-item">
                    <button className="btn btn-outline-success custom" onClick={showProducts}>My products</button>
                </li>
                <li className="list-group-item">
                    <button className="btn btn-btn-outline-warning custom" onClick={showOrdersMap}>Show Map</button>
                </li>
            </ul>
        </div>
    )
}
