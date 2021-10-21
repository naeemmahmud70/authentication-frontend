import React, { useState } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import './Login.css'

const Login = () => {

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
                        <Button className="text-center" type="submit" variant="success">Submit</Button>
                    </Form>
                </Col>
            </div>
        </div>
    );
};

export default Login;