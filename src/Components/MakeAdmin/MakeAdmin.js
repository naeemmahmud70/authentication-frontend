import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import swal from 'sweetalert';

const MakeAdmin = () => {

    const [admin, setAdmin] = useState({ name: '', email: '' });

    const handleBlur = (e) => {

        let isFieldValid;
        if (e.target.name === 'name') {
            isFieldValid = e.target.value.length > 4;
        }

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }

        if (isFieldValid) {
            const newAdmin = { ...admin };
            newAdmin[e.target.name] = e.target.value;
            setAdmin(newAdmin);
        };
    }

    const handleSubmit = (e) => {
        const url = `http://localhost:5000/makeAdmin`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(admin)
        })
            .then(res => {
                if (res.status) {
                    swal("Done!", "One new admin added!", "success")
                }
            })
            .catch((error) => {
                alert(error.errorMessage)
            });
        e.preventDefault()
    }

    return (
        <Row>
            <Col md={2}>
                <Sidebar></Sidebar>
            </Col>
            <Col className="p-3" md={10}>
                <div className="bg-light">
                    <h3 className="fw-bold">Make new admin</h3>
                    <hr />
                </div>
                <Col md={4} className="shadow bg-light p-4 rounded">
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control onBlur={handleBlur} type="text" name="name" placeholder="Enter Name" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onBlur={handleBlur} type="email" name="email" placeholder="Enter Email" required />
                        </Form.Group>

                        <Button className="text-center" type="submit" variant="success">Submit</Button><br />

                    </Form>
                </Col>
            </Col>

        </Row>
    );
};

export default MakeAdmin;