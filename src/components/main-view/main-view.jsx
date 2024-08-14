import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    fetch("https://movie-api-main-3.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          console.log(movie);
          return {
            _id: movie._id,
            ImagePath: movie.ImagePath,
            Title: movie.Title,
            Description: movie.Description,
            Genre: [
              {
                name: movie.Genre.Name,
                description: movie.Genre.Description,
              },
            ],
            Director: [
              {
                name: movie.Director.Name,
                bio: movie.Director.Bio,
                birthyear: movie.Director.Birth,
                description: movie.Director.Description,
              },
            ],
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, movies]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onSearch={(query) => setSearchQuery(query)}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col style={{ textAlign: "right" }}></Col>
                ) : (
                  <>
                    <Row>
                      {filteredMovies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={6} lg={3}>
                          <MovieCard
                            key={movie._id}
                            movie={movie}
                            updateAction={setUser}
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
