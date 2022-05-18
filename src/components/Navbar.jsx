import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
const Navbar = () => {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <div style={{ position: 'absolute', zIndex: '1' }}>
        <DropdownButton id='dropdown-basic-button' variant='secondary' title=''>
          <Dropdown.Item href='#/action-1'>
            {!isLoggedIn && (
              <Link to='/signup'>
                <button>Sign UPPER!</button>
              </Link>
            )}
          </Dropdown.Item>
          <Dropdown.Item href='#/action-2'>
            {!isLoggedIn && (
              <Link to='/login'>
                <button>Log in!</button>
              </Link>
            )}
          </Dropdown.Item>
          <Dropdown.Item href='#/action-3'>
            {isLoggedIn && (
              <>
                <Link to='/'>
                  <button onClick={logOutUser}>Log out!</button>
                </Link>
                <Link to='/places-create'>
                  <button>Create a place</button>
                </Link>
              </>
            )}
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </>

    // <nav>
    //   {!isLoggedIn && (
    //     <>
    //       <Link to='/signup'>
    //         <button>Sign UPPER!</button>
    //       </Link>

    //       <Link to='/login'>
    //         <button>Log in!</button>
    //       </Link>
    //     </>
    //   )}
    //   {isLoggedIn && (
    //     <>
    //       <Link to='/'>
    //         <button onClick={logOutUser}>Log out!</button>
    //       </Link>
    //       <Link to='/places-create'>
    //         <button>Create a place</button>
    //       </Link>
    //     </>
    //   )}
    // </nav>
  );
};

export default Navbar;
