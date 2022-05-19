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
const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [placesData, setPlacesData] = useState([]);

  const [placesDataClone, setPlacesDataClone] = useState([]);

  // const [placesDataFilter, setplacesDataFilter] = useState([]);

  // const sortByName = () => {
  //   const updatedNames = [
  //     ...placesDataFilter.sort((a, b) => a.name.localeCompare(b.name)),
  //   ];

  //   setplacesDataFilter(updatedNames);
  // };

  useEffect(() => {
    axios.get(`${API_URL}/api/places`).then((response) => {
      console.log(response.data.message);

      setPlacesData([...response.data.message]);

      // setPlacesDataClone([...response.data.message]);
    });
  }, []);

  //  shouldnt have 2 effect hooks pass the original state, add new place .. original state, newplace
  useEffect(() => {
    axios.get(`${API_URL}/api/places`).then((response) => {
      setPlacesData([...response.data.message]);
      console.log(response.data.message);
    });
    // every time it changes it rerenders everytime placesdataclone changes it runs the useeffect and when use effect runs we update state with array of places when we delete it
  }, [placesDataClone]);
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              data={placesData}
              setState={setPlacesDataClone}
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
                <PlacesCreate data={placesData} setState={setPlacesDataClone} />
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
