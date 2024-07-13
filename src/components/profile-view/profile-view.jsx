import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const ProfileView = ({ username, token, onLogout, movies }) => {
  const [users, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://movie-api-main-3.onrender.com//users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, token]);

  const handleUpdate = (UpdateUser) => {
    setUser(UpdateUser);

    // Update the URL with the updated username upon refresh
    navigate(`/users/${UpdateUser.Username}`, { replace: true });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setIsDeleting(true);
      try {
        // Send delete request to backend API
        const response = await axios.delete(
          `https://movie-api-main-3.onrender.com//users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Profile deleted");
          // Call onLogout from MainView to perform logout
          onLogout();
          navigate("/login");
        } else {
          alert("Failed to delete profile:", response.statusText);
          // User cancelled deletion
          setIsDeleting(false);
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter favorite movies
  const favoriteMovies = movies.filter((m) =>
    users.FavoriteMovies.includes(m._id)
  );

  // Format date to "MM-DD-YYYY" ignoring the offset
  const formattedBirthday = moment.utc(users.Birthday).format("MM-DD-YYYY");

  return (
    <Row className="justify-content-center">
      <Col lg={8}>
        <div className="profile-section mb-4 p-4">
          <h1 className="text-center mb-4">Profile Info</h1>
          <UserInfo
            username={users.Username}
            email={users.Email}
            birthday={formattedBirthday}
          />
        </div>
        <div className="profile-section mb-4 p-4">
          <h2 className="text-center mb-4">Update Info</h2>
          <ProfileUpdate
            username={username}
            token={token}
            user={users}
            onProfileUpdate={handleUpdate}
          />
          <ProfileDelete username={username} onDelete={handleDelete} />
        </div>
      </Col>
      <Row className="mb-4">
        <Col xs={12}>
          <div className="profile-section p-4">
            <h2 className="text-center mb-4">Favorite Movies</h2>
            <FavoriteMovies
              favoriteMovies={favoriteMovies}
              user={users}
              token={token}
              onUpdateFavorites={(movieId) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  FavoriteMovies: prevUser.FavoriteMovies.filter(
                    (id) => id !== movieId
                  ),
                }));
              }}
            />
          </div>
        </Col>
      </Row>
    </Row>
  );
};

// Define prop types for ProfileView
ProfileView.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
};
