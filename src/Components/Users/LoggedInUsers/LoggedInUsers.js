import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const LoggedInUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/loggedInUsersData')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, []);

    return (
        <Table className="p-2" striped bordered hover>
        <thead>
            <tr>
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) =>
                <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                </tr>
            )}

        </tbody>
    </Table>
    );
};

export default LoggedInUsers;