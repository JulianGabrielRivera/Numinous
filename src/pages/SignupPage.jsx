import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
      <div className='signUpContainerInfo'>
        <h1>Sign UPPER!</h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', width: '200px' }}
        >
          <label htmlFor='emailClick'>Email:</label>
          {/* ask about value and email */}
          {/* access by name and gets value */}
          <input
            type='text'
            name='email'
            value={email}
            onChange={handleEmail}
          />

          <label htmlFor='passwordClick'>Password:</label>
          {/* ask about value and name */}
          <input
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />

          <label htmlFor='nameClick'>Name:</label>
          <input type='text' name='name' value={name} onChange={handleName} />
          <button type='submit'>Sign UPPER!</button>
        </form>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <p>Already have an account?</p>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
