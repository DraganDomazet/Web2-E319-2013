import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomerPage(props) {
    const location = useLocation();

    const navigate = useNavigate();
    const handleClick = async e => {
        navigate('updateprofile', { state: { user: location.state.user } });
    }
    return (


        <div className="row mx-auto col-10 col-md-8 col-lg-6">
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
