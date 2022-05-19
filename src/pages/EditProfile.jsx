import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
const APIURL = process.env.REACT_APP_SERVER_URL;
const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // const [userData, setUserData] = useState({});

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const storedToken = localStorage.getItem('authToken');

  const { user } = useContext(AuthContext);
  // console.log(user);
  // console.log(user._id);
  // const userID = user._id;
  // console.log(userID);
  useEffect(() => {
    axios
      .get(`${APIURL}/api/user`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        const userProfile = response.data;
        setEmail(userProfile.email);
        setName(userProfile.name);
        setPassword(userProfile.password);
        console.log(userProfile.name);

        // const userProfile = response.data.message;

        // setUserData([...response.data.message]);

        // setPlacesDataClone([...response.data.message]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, password, email };

    axios
      .put(`${APIURL}/api/user`, requestBody, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })

      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='editContainer'>
      <div className='editContainerInfo'>
        <h1>Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', width: '200px' }}
        >
          <label htmlFor=''>Email:</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={handleEmail}
          />
          <label htmlFor=''>Name:</label>
          <input type='text' name='name' value={name} onChange={handleName} />
          <label htmlFor=''>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />
          <button type='submit'>Full Send It</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
