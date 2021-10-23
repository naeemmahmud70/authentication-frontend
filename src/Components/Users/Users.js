import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import LoggedInUsers from './LoggedInUsers/LoggedInUsers';
import RegisteredUsers from './RegisteredUsers/RegisteredUsers';

const Users = () => {
    return (
        <Row >
            <Col md={2}>
                <Sidebar></Sidebar>
            </Col>
            <Col className="p-3 bg-light" md={5}>
                <div className=" p-2">
                    <h2 className="fw-bold">Registered Users</h2>
                    <hr />
                </div>
                <RegisteredUsers></RegisteredUsers>
            </Col>
            <Col className="p-3 bg-light" md={5}>
                <div className=" p-2">
                    <h2 className="fw-bold">LoggedIn Users</h2>
                    <hr />
                </div>
                <LoggedInUsers></LoggedInUsers>
            </Col>
        </Row>
    );
};

export default Users;