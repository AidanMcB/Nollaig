import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { logout } from '../auth/firebase-auth';

function Navbar(props: any) {

    console.log("NavBar Rendered")

    return(
        <div className="navbar">
            <div className="navbar-left">
                <Link to={"wishlist/" + props.user.id} className="navbar-item"> 
                    My List 
                </Link>
                <a className="navbar-item">
                    Add a Gift
                </a>
                <a className="navbar-item">
                    My Purhases
                </a>
                <a className="navbar-item">
                    All Lists 
                </a>
            </div> 

            <div className="navbar-right"> 
                { props.user.id ? 
                    <span>
                        <span>
                            { props.user.name }
                        </span>
                        <a className="navbar-item" onClick={props.logOut}>
                            Logout
                        </a>
                    </span>
                    : null
                }
            </div>
        </div>
    ) 
}

export default Navbar;