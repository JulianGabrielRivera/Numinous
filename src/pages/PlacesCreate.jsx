import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const PlacesCreate = (props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [continent, setContinent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // instantiate so we could use it
  const navigate = useNavigate();
  const { storedToken } = useContext(AuthContext);
  console.log(storedToken);

  // lets set our handle that will have our value stored in it
  const handleName = (e) => setName(e.target.value);
  const handleUrl = (e) => setUrl(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleRating = (e) => setRating(e.target.value);
  const handleContinent = (e) => setContinent(e.target.value);

  const APIURL = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, url, description, rating, continent };
    axios
      .post(`${APIURL}/api/places/create`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        // forced the new state since we used a double useeffect in app
        props.setState([...props.data]);
        navigate('/');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
        console.log(err);
      });
    setName('');
    setUrl('');
    setDescription('');
    setRating(0);
    setContinent('');
  };

  return (
    <div className='placeCreateContainer'>
      <div className='placeCreateContainerInfo'>
        <h1>Create New Vacay</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', width: '200px' }}
        >
          <label htmlFor='placeName'>Name:</label>
          <input type='text' name='name' value={name} onChange={handleName} />
          <label htmlFor=''>Image:</label>
          <input type='text' name='url' value={url} onChange={handleUrl} />

          <label htmlFor=''>Description:</label>
          <input
            type='text'
            name='description'
            value={description}
            onChange={handleDescription}
          />
          <label htmlFor=''>Rating:</label>
          <input
            type='number'
            value={rating}
            onChange={handleRating}
            name='rating'
          />
          <label htmlFor='continentName'>Continent:</label>
          <input
            type='text'
            id='continentName'
            name='continent'
            value={continent}
            onChange={handleContinent}
          />
          <button type='submit'>Numinous</button>
        </form>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PlacesCreate;
