import React from 'react';
import {Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Navbar className="px-5" bg="dark" variant="dark">
                <Navbar.Brand className="fw-bold" href="#home"><h2>AspireHive</h2></Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/home" className="fw-bold mx-4">home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard" className="fw-bold mx-4">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/login" className="fw-bold mx-4">Login</Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
};

export default Header;