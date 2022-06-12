import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import videoBg from '../assets/video/beachvid.mp4';
import { useInterval } from 'usehooks-ts';
import jwt_decode from 'jwt-decode';

const API_URL = process.env.REACT_APP_SERVER_URL;
const LoginPage = (props) => {
  // set the state so wehn you get into the page it will be blank with no values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [user, setUser] = useState({});

  // used to navigate to next page it is a custom hook
  const navigate = useNavigate();
  const google = window.google;
  function handleCallbackResponse(response) {
    // let userObject = jwt_decode(response.credential);
    // let googleToken = response.credential;
    // // console.log(googleToken);
    // // console.log(userObject);
    // setUser(userObject);
    // // console.log(response);
    console.log(response);
    window.open('http://localhost:5005/auth/google');

    navigate('/');
    // axios
    //   .post(`${API_URL}/auth/google`, { googleToken: googleToken })
    //   .then((response) => {
    //     // storeToken(response.data.authToken);
    //     // authenticateUser();
    //     // navigate('/');
    //     // response.send(JSON.stringify({ token: googleToken }));
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     const errorDescription = error.response.data.message;
    //     setErrorMessage(errorDescription);
    //   });
    document.getElementById('signInDiv').hidden = true;
  }
  useEffect(() => {
    // global google the script we put in public html folder gives us the javascripts objects we can use in our react js

    google.accounts.id.initialize({
      client_id:
        '478476523522-7ohmi0thf3t15l3fv8t9encbkg9p7d3j.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  //  if we have no user : show sign in button: if we have user show log out button.

  const { storeToken, authenticateUser } = useContext(AuthContext);

  // handles the changes inside these text boxes
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // what happens when you submt the form.
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // parsis body to send to back end
    const requestBody = { email, password };
    // this url is the direction we set up on the back end and passing it the object with the values of email and password once user is logged in
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
        console.log(response);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  const handleSignOut = (e) => {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  };

  return (
    <div className='loginContainer'>
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        style={{ height: '100vh', position: 'relative' }}
      />
      <div className='loginContainerInfo' style={{ position: 'absolute' }}>
        <h1>Log In</h1>

        <form
          onSubmit={handleLoginSubmit}
          style={{ display: 'flex', flexDirection: 'column', width: '200px' }}
        >
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />

          <button
            type='submit'
            style={{ marginTop: '20px', borderRadius: '10px' }}
          >
            Login
          </button>
          <div id='signInDiv' style={{ zIndex: '1' }}></div>

          {Object.keys(user).length != 0 && (
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          )}
          {user && (
            <div>
              <img src={user.picture} />
              <h3>{user.name}</h3>
            </div>
          )}
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <p style={{ marginTop: '10px' }}>Don't have an account yet?</p>
        <Link
          to={'/signup'}
          style={{
            textDecoration: 'none',
            color: '#343a40',
            fontWeight: 'bold',
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
