import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onSearch, onLoggedOut }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>

                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {/* Search bar only visible on large screens */}
          {user && (
            <Form className="d-none d-lg-flex mx-auto align-items-center">
              <Form.Control
                type="search"
                placeholder="Search movie"
                className="me-2 custom-search"
                aria-label="Search"
                onChange={handleSearchChange}
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
