import './App.css';
import './App.jsx';
import placesToGoJSON from './places-data.json';
import SignupPage from './pages/SignupPage';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
// import SimpleMap from './pages/SimpleMap';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Places from './pages/Places';
import PlacesDetails from './pages/PlacesDetails';
import { useEffect, useState } from 'react';
import PlacesCreate from './pages/PlacesCreate';
import IsAdmin from './components/IsAdmin';
import Video from './components/Video';
import axios from 'axios';
import EditProfile from './pages/EditProfile';
import FilterPlaces from './components/FilterPlaces';
const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [placesData, setPlacesData] = useState([]);

  const [placesDataClone, setPlacesDataClone] = useState([]);

  const [filterDataClone, setFilterDataClone] = useState([]);

  const [likes, setLikes] = useState(0);

  const [theme, setTheme] = useState('light');

  // const [filteredPlacesArray, setFilteredPlacesArray] =
  //   useState(placesDataClone);

  // const filterPlacesByString = (stringToSearch) => {
  //   const filteredPlaces = placesData.filter((placeElement) => {
  //     return placeElement.name
  //       .toLowerCase()
  //       .includes(stringToSearch.toLowerCase());
  //   });
  //   setFilteredPlacesArray(filteredPlaces);
  // };

  // const [placesDataFilter, setplacesDataFilter] = useState([]);

  // const sortByName = () => {
  //   const updatedNames = [
  //     ...placesDataFilter.sort((a, b) => a.name.localeCompare(b.name)),
  //   ];

  //   setplacesDataFilter(updatedNames);
  // };

  const addPlace = (place) => {
    const newPlace = [...placesData, place];
    setPlacesData(newPlace);
  };

  const deletePlace = (id) => {
    setPlacesData(placesData.filter((place) => place._id !== id));
  };
  // deleteplaces??

  // filterplaces?

  useEffect(() => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        console.log(response.data.message);

        setPlacesData([...response.data.message]);

        // setPlacesDataClone([...response.data.message]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //  shouldnt have 2 effect hooks pass the original state, add new place .. original state, newplace
  // useEffect(() => {
  //   axios.get(`${API_URL}/api/places`).then((response) => {
  //     setPlacesData([...response.data.message]);
  //     console.log(response.data.message);
  //   });
  //   // every time it changes it rerenders everytime placesdataclone changes it runs the useeffect and when use effect runs we update state with array of places when we delete it
  // }, [placesDataClone, likes]);

  useEffect(() => {
    setPlacesData([...placesData]);

    // every time it changes it rerenders everytime placesdataclone changes it runs the useeffect and when use effect runs we update state with array of places when we delete it
  }, [filterDataClone]);
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
      {/* <FilterPlaces handleSearch={filterPlacesByString} /> */}

      <Routes>
        <Route
          path='/'
          element={
            <Places
              data={placesData}
              setLikes={setLikes}
              deletePlace={deletePlace}
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
                <PlacesCreate
                  data={placesData}
                  setState={setPlacesDataClone}
                  addPlace={addPlace}
                />
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
