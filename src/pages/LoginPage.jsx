import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import videoBg from '../assets/video/beachvid.mp4';

const API_URL = process.env.REACT_APP_SERVER_URL;
const LoginPage = (props) => {
  // set the state so wehn you get into the page it will be blank with no values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  // used to navigate to next page it is a custom hook
  const navigate = useNavigate();

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
