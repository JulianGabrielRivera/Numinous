import './App.css';
import './App.jsx';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import IsAdmin from './components/IsAdmin';
import LoginPage from './pages/LoginPage';
import Places from './pages/Places';
import PlacesDetails from './pages/PlacesDetails';
import SignupPage from './pages/SignupPage';
import PlacesCreate from './pages/PlacesCreate';
import EditProfile from './pages/EditProfile';

import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [placesData, setPlacesData] = useState([]);

  const [filterDataClone, setFilterDataClone] = useState([]);
  const [firstLetter, setFirstLetter] = useState('');

  const [likes, setLikes] = useState(0);

  const [theme, setTheme] = useState('light');

  const addPlace = (place) => {
    const newPlace = [...placesData, place];
    setPlacesData(newPlace);
  };

  const deletePlace = (id) => {
    setPlacesData(placesData.filter((place) => place._id !== id));
  };

  const filteredPlaces = (continent) => {
    const filt = filterDataClone.filter(
      (eachPlace) => eachPlace.continent === continent
    );
    setPlacesData(filt);
  };
  const handleSearch = (e) => {
    // const firstLetter = setFirstLetter(e.target.value);
    setPlacesData(
      placesData.filter((place) => place.name[0] !== e.target.value)
    );
  };

  const showAll = () => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        setPlacesData([...response.data.message]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        console.log(response.data.message);

        setPlacesData([...response.data.message]);
        setFilterDataClone([...response.data.message]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={'App ' + theme}>
      <Navbar />
      <select
        onChange={(event) => setTheme(event.target.value)}
        style={{
          position: 'absolute',
          left: '10px',
          zIndex: '1',
          top: '150px',
        }}
      >
        <option value='light'> Light </option>
        <option value='dark'> Dark </option>
      </select>

      <Routes>
        <Route
          path='/'
          element={
            <Places
              data={placesData}
              setLikes={setLikes}
              deletePlace={deletePlace}
              filteredPlaces={filteredPlaces}
              handleSearch={handleSearch}
              showAll={showAll}
              // nameSort={sortByName}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path='/login'
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        {/* 
        <Route path='/map' element={<SimpleMap />} /> */}
        <Route
          path='/placedetails/:id'
          element={
            <IsPrivate>
              <PlacesDetails data={placesData} />
            </IsPrivate>
          }
        />
        <Route
          path='/places-create'
          element={
            <IsPrivate>
              <IsAdmin>
                <PlacesCreate data={placesData} addPlace={addPlace} />
              </IsAdmin>
            </IsPrivate>
          }
        />
        <Route
          path='/edit'
          element={
            <IsPrivate>
              <EditProfile />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
