import React, { useContext } from 'react';
import { UserContext } from '../../App';

const Dashboard = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div>
            <h1>this is dashboard</h1>
            <h2>Welcome: {LoggedInUser.name}</h2>
        </div>
    );
};

export default Dashboard;