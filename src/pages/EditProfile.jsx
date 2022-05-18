import { useState, useContext } from 'react';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const fileSelectedHandler = (event) => {
    setImage(event.target.files);
  };

  return (
    <div>
      <h1>Hey</h1>
      <input type='file' onChange={fileSelectedHandler} value={image} />
    </div>
  );
};

export default EditProfile;
