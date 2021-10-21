import React, { useContext, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import initializeAuthentication from './firebase.initialize';
import './Login.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
initializeAuthentication();



const provider = new GoogleAuthProvider();

const Login = () => {

    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        mobile: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    });
    const [newUser, setNewUser] = useState(false);

    const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'name') {
            isFieldValid = e.target.value.length > 4;
        }
        if (e.target.name === 'mobile') {
            isFieldValid = e.target.value.length > 11;
        }
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        };

    }

    const handleSubmit = (e) => {
        console.log(user)
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const { displayName, email, photoURL } = user;
                console.log(displayName, email, photoURL)
                const SignInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(SignInUser);
                setLoggedInUser(SignInUser);
                history.replace(from);
                storeAuthToken();


            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)

            });
    };

    const storeAuthToken = () => {
        getAuth.currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                console.log(error)
            });
    };

    return (
        <div className="formStyle">
            <div className="d-flex justify-content-center align-items-center">
                <Col xs={10} md={4} className="m-5 p-4 shadow">
                    <h2 className="text-center fw-bold">Login Here</h2>
                    <Form onSubmit={handleSubmit} >
                        {newUser &&
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control onBlur={handleBlur} type="text" name="name" placeholder="Enter Name" />
                            </Form.Group>
                        }
                        {newUser &&
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control onBlur={handleBlur} type="mobile" name="mobile" placeholder="Enter Number" />
                            </Form.Group>
                        }
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onBlur={handleBlur} type="email" name="email" placeholder="Enter Email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onBlur={handleBlur} type="password" name="password" placeholder="Enter Password" />
                        </Form.Group>

                        {/* {newUser && <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onBlur={handleBlur} type="password" name="confirmPassword" placeholder="Enter Confirm Password" />
                        </Form.Group>} */}

                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" onChange={() => setNewUser(!newUser)} label="New user? Registration here." />
                        </Form.Group>
                        <Button className="text-center" type="submit" variant="success">Submit</Button><br />
                        <Button onClick={handleGoogleSignIn} className="text-center m-5" type="button" variant="success">google</Button>
                    </Form>
                </Col>
            </div>
        </div>
    );
};

export default Login;