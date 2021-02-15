import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container } from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg="dark" variant="light" expand="lg" collapseOnSelect>
				<Container className="nav">
					<LinkContainer to="/">
						<Navbar.Brand className="logo" to="/">
							Blogg
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/blogs">
								<Nav.Link className="nav-link-a">Blogs</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link className="nav-link-a">Login</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
