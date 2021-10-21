import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="fw-bold" href="#home"><h2>AspireHives</h2></Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link className="fw-bold mx-4" href="#home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" className="fw-bold mx-4">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="fw-bold mx-4">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;