import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripHorizontal, faList, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import jwt_decode from "jwt-decode";
import swal from 'sweetalert';


const Sidebar = () => {

    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)

    const [isAdmin, setIsAdmin] = useState(false);
    console.log(isAdmin)

    useEffect(() => {
        fetch('http://localhost:5000/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: LoggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));
    });


    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            isSignOut()
            const signOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: ''
            }
            setLoggedInUser(signOutUser);
            swal({
                title: "Logout Successful!",
                icon: "success",
            });
        }).catch((error) => {
            alert(error.errorMessage)
        });
    };

    const isSignOut = () => {
        const token = sessionStorage.removeItem('token');
        if (!token) {
            return false;
        }
        const decodedToken = jwt_decode(token);
        // get current time
        const currentTime = new Date().getTime() / 1000;
        // compare the expiration time with the current time
        // will return false if expired and will return true if not expired
        return decodedToken.exp > currentTime;
    }
    return (
        <div className=" sidebar d-flex flex-column justify-content-between py-5 px-4" style={{ height: "100vh" }} >
            <ul className="list-unstyled">
                <li>
                    <Link to="/dashboard" className="text-white">
                        <FontAwesomeIcon icon={faGripHorizontal} /> <span>Dashboard</span>
                    </Link>
                </li>
                {isAdmin && <div>
                    <li>
                        <Link to="/users" className="text-white">
                            <FontAwesomeIcon icon={faList} /> <span>Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/makeAdmin" className="text-white" >
                            <FontAwesomeIcon icon={faUsers} /> <span>Make Admin</span>
                        </Link>
                    </li>
                </div>}


            </ul>
            <div>
                <Link onClick={handleLogOut} to="/" className="text-white my-5"><FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span></Link>
            </div>
        </div>
    );
};

export default Sidebar;