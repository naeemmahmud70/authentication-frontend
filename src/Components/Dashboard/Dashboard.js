import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import defaultImage from '../../image/default-user.png'

const Dashboard = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)

    return (
        <Row >
            <Col md={2}>
                <Sidebar></Sidebar>
            </Col>
            <Col md={10} className="bg-light">
                <h2 className="fw-bold p-2">User profile</h2>
                <hr />
                <div>
                    <div className="shadow rounded w-50 text-center p-5">
                        <div>
                            <img className=" w-25 rounded-circle" src={defaultImage} alt="" />
                        </div>
                        <h2>Hey {LoggedInUser.name}!</h2>
                        <h2>Welcome to the Aspirehive!</h2>
                    </div>
                </div>

            </Col>
        </Row>
    );
};

export default Dashboard;