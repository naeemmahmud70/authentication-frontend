import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)

   

    return (
        <Row >
            <Col md={2}>
                <Sidebar></Sidebar>
            </Col>
            <Col xs={10}>
                <div>
                    <h1>this is dashboard</h1>
                    <h2>Welcome: {LoggedInUser.name}</h2>
                </div>
            </Col>
        </Row>
    );
};

export default Dashboard;