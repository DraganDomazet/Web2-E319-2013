import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function CustomerPage(props) {
    const location = useLocation();

    const navigate = useNavigate();
    const handleClick = async e => {
        navigate('updateprofile', { state: { user: location.state.user } });
    }
    return (


        <div>
            <h1>You logged in as {location.state.user.username}!</h1>
            <nav className="navbar">  <div className="container-fluid">
                <ul className="list-inline">

                    <li>
                        <button className="btn btn-info" onClick={handleClick}>Update profile</button>

                    </li>
                    {/* <li >
                        <Link to="/NewOrder">New Order</Link>
                    </li>
                    <li>
                        <Link to="/OldOrders">Old Orders</Link>
                    </li> */}
                </ul></div>
            </nav>
        </div>
    )
}
