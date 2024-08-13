import { useState, useEffect } from "react";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";

import "./profile-view.scss";
export const ProfileView = ({ movies }) => {
  const updatedUser = JSON.parse(localStorage.getItem("user"));
  const favMovies = movies.filter((movie) => {
    return updatedUser.FavoriteMovies.include(movie._id);
  });
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
  });
  const storedToken = localStorage.getItem("token");
  const [token] = useState(storedToken ? storedToken : null);

  const updateFavMovies = (movieId) => {
    favMovies(FavoriteMovies.filter((m) => m._id !== movieId));
  };

  const fetchFavMovies = () => {
    fetch("https://movie-api-main-3.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          console.log(movie);
          return {
            _id: movie._id,
            ImagePath: movie.ImagePath,
            Title: movie.Title,
          };
        });
        moviesFromApi;
      });
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    fetch("https://movie-api-main-3.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        const foundUser = user.find((u) => u._id === currentUser._id);
        const updatedFormData = {
          ...formData,
          Username: foundUser.Username,
          Email: foundUser.Email,
          // We do not add password because we don't want the hashed value to be included in the form
        };
        setUser(foundUser);
        setFormData(updatedFormData);

        // Fetch Movies
        fetchFavMovies();
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [token]);

  useEffect(() => {
    console.log("Updated", favMovies);
  }, [favMovies]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Exclude the password from the user object when spreading it into updatedFormData
    const { Password, ...userWithoutPassword } = user;
    // Merge the existing formData state with additional user data
    const updatedFormData = {
      ...userWithoutPassword,
      ...formData,
    };

    fetch("https://movie-api-main-3.onrender.com/users/${user.Username}", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("users", JSON.stringify(updatedUser));
        alert(" Updated Successfully!");
      })
      .catch((error) =>
        console.error("Error updating user information:", error)
      );
  };
  const handleDeregister = () => {
    fetch(
      `https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      console.log(response);
      if (response.ok) {
        console.log("Account deleted successfully!");
        onLoggedOut();
      } else {
        alert("Failed to delete account!");
      }
    });
  };

  return (
    <Container>
      {user && (
        <Row>
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo
                  Username={user.Username}
                  Email={user.Email}
                  Birthday={user.Birthday}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                <form className="profile-form h-100" onSubmit={handleSubmit}>
                  <h4>Want to change some info?</h4>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      value={formData.Username}
                      onChange={(e) => handleUpdate(e)}
                      required
                      minLength="5"
                      placeholder="username must be at least 5 characters"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      onChange={(e) => handleUpdate(e)}
                      required
                      minLength="5"
                      placeholder="password must be at least 5 characters"
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={(e) => handleUpdate(e)}
                      required
                      placeholder="please enter your email address"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="birthday"
                      name="Birthday"
                      onChange={(e) => handleUpdate(e)}
                      required
                      minLength="5"
                      placeholder="1990-11-14"
                    />
                  </Form.Group>
                  <button
                    className="back-button"
                    style={{ cursor: "pointer" }}
                    variant="primary"
                    type="submit"
                  >
                    Update
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12}>
            <FavoriteMovies
              favoriteMovieList={favMovies}
              updateFavMovies={updateFavMovies}
            />
          </Col>
        </Row>
      )}
      <button
        className="back-button"
        style={{ cursor: "pointer" }}
        onClick={handleDeregister}
      >
        Deregister
      </button>
    </Container>
  );
};
