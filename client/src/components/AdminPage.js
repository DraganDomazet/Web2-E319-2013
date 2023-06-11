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
    return (


        <div>
            <h1>You logged in as Administrator {location.state.user.username}!</h1>
            <nav className="navbar">  <div className="container-fluid">
                <ul className="list-inline">

                    <li>
                        <button className="btn btn-info" onClick={handleClick}>Update profile</button>
                    </li>
                    <li>
                        <button className="btn btn-info" onClick={handleClick2}>Get Merchants Requests</button>
                    </li>
                    
                </ul></div>
            </nav>
        </div>
    )
}
