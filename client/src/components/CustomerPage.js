import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomerPage(props) {
    const location = useLocation();

    const navigate = useNavigate();
    const handleClick = async e => {
        navigate('updateprofile', { state: { user: location.state.user } });
    }

    const handleClick2 = async e => {
        navigate('/addorder', { state: { user: location.state.user } });
    }

    console.log(location.state.updated ? location.state.updated : "nope");

    return (


        <div className="jumbotron text-center">
            <h1 className='text-center text-body-tertiary'>Customer page</h1>
            <h1 className='text-center'>{location.state.updated ? "You have updated your profile!" : ""}</h1>

            <h1>{location.state.order ? "You have created order!" : "You logged in with username: " + location.state.user.username}</h1>

            <ul className="list-group">
                <li className='list-group-item'>
                    <button className="btn btn-outline-danger custom" onClick={handleClick}>Update profile</button>
                </li>
                <li className='list-group-item'>
                    <button className="btn btn-block btn-outline-dark custom" onClick={handleClick2}>Add order</button>
                </li>
                <li >
                    <button className="btn btn-block disabled btn-outline-info custom">New Orders(not implemented yet)</button>
                </li>
                <li>
                    <button className="btn btn-block btn-outline-info custom disabled">Old Orders(not implemented yet)</button>
                </li>
            </ul>
        </div>
    )
}
