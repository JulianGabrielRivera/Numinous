import blackHeart from '../assets/images/heart2.png';
import redHeart from '../assets/images/heart1.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';
import { ThumbDownIcon } from '@heroicons/react/solid';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Place from './Place';

import { AuthContext } from '../context/auth.context';
import Rating from '../components/Rating';
const APIURL = process.env.REACT_APP_SERVER_URL;
const Places = (props) => {
  const { data, setState, setLikes } = props;
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
      <Place data={data} setState={setState} setLikes={setLikes} />
    </div>
  );
};

export default Places;
