import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const PlacesCreate = (props) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
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
  const handleImg = (e) => setImg(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleRating = (e) => setRating(e.target.value);
  const handleContinent = (e) => setContinent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, img, description, rating, continent };
    axios
      .post('http://localhost:5005/api/places/create', requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        props.setState([...props.data]);
        navigate('/');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
        console.log(err);
      });
    setName('');
    setImg('');
    setDescription('');
    setRating(0);
    setContinent('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='placeName'>Name:</label>
        <input type='text' name='name' value={name} onChange={handleName} />
        <label htmlFor=''>Image:</label>
        <input type='text' name='img' value={img} onChange={handleImg} />

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
        <button type='submit'>Create</button>
      </form>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export default PlacesCreate;
