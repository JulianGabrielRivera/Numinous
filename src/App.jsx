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
<<<<<<< HEAD
import FilterPlaces from './components/FilterPlaces';
import SearchBar from './components/SearchBar';
=======

import axios from 'axios';

>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a
const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [placesData, setPlacesData] = useState([]);

  const [filterDataClone, setFilterDataClone] = useState([]);
  const [firstLetter, setFirstLetter] = useState('');

  const [likes, setLikes] = useState(0);

  const [theme, setTheme] = useState('light');

<<<<<<< HEAD
  const filterPlacesByString = (stringToSearch) => {
    const filteredPlaces = placesData.filter((placeElement) => {
      return placeElement.name
        .toLowerCase()
        .includes(stringToSearch.toLowerCase());
    });
    setFilterDataClone(filteredPlaces);
  };
  // const [filteredPlacesArray, setFilteredPlacesArray] =
  //   useState(placesDataClone);
=======
  const addPlace = (place) => {
    const newPlace = [...placesData, place];
    setPlacesData(newPlace);
  };
>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a

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
<<<<<<< HEAD

        // setPlacesDataClone([...response.data.message]);
=======
>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(filterDataClone);

<<<<<<< HEAD
  //  shouldnt have 2 effect hooks pass the original state, add new place .. original state, newplace
  useEffect(() => {
    axios.get(`${API_URL}/api/places`).then((response) => {
      setPlacesData([...response.data.message]);

      console.log(response.data.message);
    });
    // every time it changes it rerenders everytime placesdataclone changes it runs the useeffect and when use effect runs we update state with array of places when we delete it
  }, [placesDataClone, likes]);

  useEffect(() => {
    setPlacesData([...placesData]);

    // every time it changes it rerenders everytime placesdataclone changes it runs the useeffect and when use effect runs we update state with array of places when we delete it
  }, [filterDataClone]);
=======
>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a
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
<<<<<<< HEAD
              filterDataClone={filterDataClone}
              filterPlacesByString={filterPlacesByString}
=======
              deletePlace={deletePlace}
              filteredPlaces={filteredPlaces}
              handleSearch={handleSearch}
              showAll={showAll}
>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a
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
