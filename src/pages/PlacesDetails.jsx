import { useParams } from 'react-router-dom';
import { XIcon } from '@heroicons/react/solid';
import { useState, useEffect, useContext } from 'react';
import Rating from '../components/Rating';
import axios from 'axios';

import { AuthContext } from '../context/auth.context';
const APIURL = process.env.REACT_APP_SERVER_URL;
{
  /* <img
src={placeData.img}
alt=''
style={{ height: '400px', width: '100vw', padding: '10px' }}
/> */
}

const styledX = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12' /%3E%3C/svg%3E")`,
};

const PlacesDetails = (props) => {
  // this is whatever is after /placedetails
  const { id } = useParams();

  // const { data } = props;
  // console.log(data);
  const { storedToken } = useContext(AuthContext);

  const [placeData, setPlaceData] = useState(null);

  // grab the comment data and send to back end.
  const [content, setContent] = useState('');

  const handleContent = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { content };

    axios
      .post(`${APIURL}/api/comments/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        setContent('');
        // triggers rerender
        // copy old state and add new comment to state
        setPlaceData({
          ...placeData,
          comments: [...placeData.comments, response.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${APIURL}/api/places/${id}`)
      .then((response) => {
        console.log(response.data);
        setPlaceData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // renders once
  }, [id]);

  return (
    placeData && (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: '400px',
            width: '100vw',
            padding: '10px',
            backgroundImage: `url(${placeData.img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <h5>{placeData.name}</h5>

        <Rating data={placeData.rating} />
        <p style={{ textAlign: 'left', padding: '20px' }}>
          {placeData.description}
        </p>
        <div
          style={{
            height: '200px',
            width: '500px',
            overflowY: 'scroll',
            textAlign: 'center',
          }}
        >
          {placeData.comments.map((comment) => {
            return (
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '0.8rem' }}>
                  {comment.author.name}
                </span>
                <p>{comment.content}</p>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <textarea
            name='content'
            value={content}
            id='setComment'
            cols='30'
            rows='2'
            onChange={handleContent}
          ></textarea>

          <button type='submit'>Post Comment</button>
        </form>
      </div>
    )
  );
};

export default PlacesDetails;
