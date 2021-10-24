import React, { useContext, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import initializeAuthentication from './firebase.initialize';
import './Login.css'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';

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

    // Form validation
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

    //Signing With Email and Password

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.error = "";
                    setUser(newUserInfo)
                    updateUserName(user.name, user.mobile, user.email)
                    const { displayName, email, phoneNumber } = userCredential.user;
                    const signInUser = { name: displayName, email: email, phoneNumber: phoneNumber };
                    setLoggedInUser(signInUser);
                    storeAuthToken();
                    swal({
                        title: "Registration Successful!",
                        icon: "success",
                    });
                })

                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = false;
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        };

        if (!newUser && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.error = "";
                    setUser(newUserInfo)
                    const { displayName, email } = userCredential.user;
                    const signInUser = { name: displayName, email: email };
                    setLoggedInUser(signInUser);
                    storeAuthToken();
                    swal({
                        title: "Sign In Successfully!",
                        icon: "success",
                    });
                })

                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = false;
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    };

    // Update user profile

    const updateUserName = (name, phone, email) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name, phoneNumber: phone
        }).then(() => {
            const signInUser = { name: name, phoneNumber: phone, email: email };
            setLoggedInUser(signInUser);
            storeRegisterData(signInUser);
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        });
    };


    //  Singing with GOOGLE

    const handleGoogleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const { displayName, email, photoURL, phoneNumber } = user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    phoneNumber: phoneNumber
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                storeAuthToken();
                storeLoggedInUserData(signInUser)

            }).catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);

            });
    };

    // Store auth token in session storage.

    const storeAuthToken = () => {
        getAuth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                alert(error.errorMessage)
            });
    };

    //Post registered user data to the database.

    const storeRegisterData = (data) => {
        const url = `https://salty-fjord-37700.herokuapp.com/addRegisterData`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
              console.log(res)
            })
            .catch((error) => {
                alert(error.errorMessage)
            });
    };

    //Post loggedIn User data to the database.

    const storeLoggedInUserData = (data) => {
        const url = `https://salty-fjord-37700.herokuapp.com/addLoggedInData`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
               console.log(res)
            })
            .catch((error) => {
                alert(error.errorMessage)
            });
    };

    return (
        <div className="formStyle">
            <div className="d-flex justify-content-center align-items-center">
                <Col xs={10} md={4} className="m-5 p-4 shadow">
                    <h2 className="text-center fw-bold">{newUser ? "Registration Here" : "Login Here"}</h2>
                    <Form onSubmit={handleSubmit} >
                        {newUser &&
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control onBlur={handleBlur} type="text" name="name" placeholder="Enter Name" required />
                            </Form.Group>
                        }
                        {newUser &&
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control onBlur={handleBlur} type="mobile" name="mobile" placeholder="Enter Number" required />
                            </Form.Group>
                        }
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onBlur={handleBlur} type="email" name="email" placeholder="Enter Email" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onBlur={handleBlur} type="password" name="password" placeholder="Enter Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" onChange={() => setNewUser(!newUser)} label="New user? Registration here." />
                        </Form.Group>
                        <Button className="text-center" type="submit" variant="success">{newUser ? "Registration" : "Sign In"}</Button><br />
                    </Form>
                    <hr />
                    <div className="text-center">
                        <Button onClick={handleGoogleSignIn} className="text-center" type="button" variant="success">Login with google</Button>
                    </div>
                    <div>
                        <p className="text-danger fw-bold">{user.error}</p>
                        {user.success && <p className="text-success fw-bold">User {newUser ? 'created' : 'Logged In'} successfully</p>}
                    </div>
                </Col>
            </div>
        </div>
    );
};

export default Login;