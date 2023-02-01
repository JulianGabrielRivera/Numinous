import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
const Navbar = () => {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <div style={{ position: "absolute", zIndex: "1", top: 5, left: 10 }}>
        <DropdownButton id="dropdown-basic-button" variant="secondary" title="">
          <div className="dropDown">
            <Link to="/">
              <button>Home</button>
            </Link>
            {!isLoggedIn && (
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            )}

            {!isLoggedIn && (
              <Link to="/login">
                <button>Log in!</button>
              </Link>
            )}

            {isLoggedIn && (
              <>
                <Link to="/">
                  <button onClick={logOutUser}>Log out!</button>
                </Link>
                <Link to="/places-create">
                  <button>Create a place</button>
                </Link>
                <Link to="/cart">
                  <button>My Cart</button>
                </Link>
                <Link to="/edit">
                  <button>Edit</button>
                </Link>
              </>
            )}
          </div>
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
