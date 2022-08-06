<<<<<<< HEAD
import blackHeart from '../assets/images/heart2.png';
import redHeart from '../assets/images/heart1.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';
import { ThumbDownIcon } from '@heroicons/react/solid';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchPlaces from '../components/SearchBar';
=======
import Video from '../components/Video';

import Place from './Place';

import FilterPlaces from '../components/FilterPlaces';
>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a

const Places = (props) => {
<<<<<<< HEAD
  const { data, setState, setLikes, filterDataClone } = props;
  console.log(filterDataClone);
  const { storedToken } = useContext(AuthContext);
  // const [like, setLike] = useState(0);
  const { placeId } = useParams();
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };
  // const handleClick = () => {
  //   axios
  //     .post(`${APIURL}/api/like/${placeId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className='imageContainer'>
      {filterDataClone.map((place) => {
        return (
          <div key={place._id}>
            <Link
              to={`/placedetails/${place._id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  position: 'relative',
=======
  const { data, setLikes, deletePlace, filteredPlaces, showAll, handleSearch } =
    props;

  return (
    <>
      <div>
        <Video />
        <FilterPlaces
          filteredPlaces={filteredPlaces}
          showAll={showAll}
          handleSearch={handleSearch}
        />
      </div>
>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a

      <div className='imageContainer'>
        <Place data={data} setLikes={setLikes} deletePlace={deletePlace} />
      </div>
    </>
  );
};

export default Places;
