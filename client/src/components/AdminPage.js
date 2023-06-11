import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function CustomerPage(props) {
    const location = useLocation();

    const navigate = useNavigate();
    const handleClick = async e => {
        navigate('updateprofile', { state: { user: location.state.user } });
    }
    const handleClick2 = async e => {
        navigate('/getmerchants', { state: { user: location.state.user } });
    }

    const showOrders = async e => {
        navigate('/allorders', { state: { user: location.state.user } });
    }
    return (


        <div className="jumbotron text-center">
            <h1>You logged in as Administrator {location.state.user.username}!</h1>
            <ul className="list-group">
                <li className='list-group-item'>
                    <button className="btn btn-outline-danger custom" onClick={handleClick}>Update profile</button>
                </li>
                <li className='list-group-item'>
                    <button className="btn btn-outline-dark custom" onClick={handleClick2}>Get Merchants Requests</button>
                </li>
                <li className='list-group-item'>
                    <button className="btn btn-outline-success custom" onClick={showOrders}>Show all orders</button>
                </li>

            </ul>
        </div>
    )
}
