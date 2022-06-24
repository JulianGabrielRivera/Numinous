import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import videoBg from '../assets/video/beachvid.mp4';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
const APIURL = process.env.REACT_APP_SERVER_URL;
const SignupPage = () => {
  // storing the values for each here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // instantiate so we could use it
  const navigate = useNavigate();

  // lets set our handle that will have our value stored in it

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  // handle a submit where we will send the request body to the back end

  const handleSubmit = (e) => {
    // we need this so the page does not rerender
    e.preventDefault();

    // this is what we will pass to the backend in the form of an object then the back end will be able to access it
    // are we parsing whatever we get off our values here?
    const requestBody = { email, password, name };

    // we are sending our body to the back, using the route we named it in the backend here then wwhen we get the response from the back end we navigate to the login page
    axios
      .post(`${APIURL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
        console.group(err);
      });
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className='signUpContainer'>
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        style={{ height: '100vh', position: 'relative' }}
      />
      <div className='signUpContainerInfo' style={{ position: 'absolute' }}>
        <h1>Sign UPPER!</h1>

        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}
        >
          <Form style={{ width: '400px' }} onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={handlePassword}
                // style={{ width: '400px' }}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
                value={name}
                onChange={handleName}
              />
            </Form.Group>
            <Link to={'/password'} style={{ color: 'lightgray' }}>
              Forgot password?
            </Link>
            <div>
              <Button
                variant='primary'
                type='submit'
                style={{ marginTop: '20px', borderRadius: '10px' }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <p style={{ marginTop: '10px' }}>Already have an account?</p>
        <Link
          to={'/login'}
          style={{
            textDecoration: 'none',
            color: '#343a40',
            fontWeight: 'bold',
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
