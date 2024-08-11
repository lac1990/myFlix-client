import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movie-api-main-3.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          onLoggedIn(response.user, response.token);
          onLoggedIn(username);
        } else {
          alert("Login failed");
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="userLogin">
      <Form.Group controlId="formUsername" className="inputGroup">
        <div>
          <h1 className="userLogin">User Login</h1>
        </div>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          className="loginForm"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          className="loginForm"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="loginButton">
        Submit
      </Button>
    </Form>
  );
};
