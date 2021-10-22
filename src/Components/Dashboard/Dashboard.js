import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { getAuth, signOut } from "firebase/auth";
import jwt_decode from "jwt-decode";
import swal from 'sweetalert';

const Dashboard = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)

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

    const handleSignOut = () => {
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
    }

    return (
        <div>
            <h1>this is dashboard</h1>
            <h2>Welcome: {LoggedInUser.name}</h2>
            <h3>Number: {LoggedInUser.phoneNumber}</h3>
            <button onClick={handleSignOut} >Logout</button>
        </div>
    );
};

export default Dashboard;