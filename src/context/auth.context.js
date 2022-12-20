import React, { useState, useEffect } from "react";

import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

// creating a context
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [isLoading, setIsLoading] = useState("true");
  const [user, setUser] = useState(null);
  const [totalLikes, setTotalLiked] = useState();

  /* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/getUserlikes`, {
        headers: {
          authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        // console.log(response.data.userFound.places.length, "yo");
        let allPlaces = response.data.userFound.places.length;
        setTotalLiked(allPlaces);
      });
  }, [totalLikes]);
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const storedToken = localStorage.getItem("authToken");

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // If the token exists in the localStorage
    storeToken(storedToken);
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid
          const user = response.data;
          console.log(user);
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          setTotalLiked(response.data.places.length);
          // setTotalLiked(response.data.places.length);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    // localstorage an object with these properties and we can access them
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        storedToken,
        setTotalLiked,
        totalLikes,
      }}
    >
      {/*  we need this so when we wrap our provider around app, every children of app the provider becomes able to use */}
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
