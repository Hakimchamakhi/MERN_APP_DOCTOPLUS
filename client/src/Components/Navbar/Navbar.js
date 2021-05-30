import { Link, useHistory } from "react-router-dom";
import {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Button, MenuItem, Menu} from '@material-ui/core';
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { USER_LOGGED_OUT } from "../../actions/types";
import "./Navbar.css"

const NavbarComp = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  let profile = useSelector((state) => state.auth.profile);
  const userType = localStorage.getItem("userType");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getprofile = () => {
    setAnchorEl(null);
    history.push(`/${userType}/profile`)
  };
  const logout_user = () => {
    localStorage.clear();
    dispatch({type: USER_LOGGED_OUT })
    setAnchorEl(null);
    history.push("/")
  }
  if (isAuth) {
    return (
      <>
        <Navbar bg="#3e0748" variant="dark" className="Navbar" >
          <Navbar.Brand href="/">Docto+</Navbar.Brand>
          <Nav className="mr-auto navHFP">
            <Nav.Link href={`/${userType}`}>Home</Nav.Link>
            <Nav.Link href="contact">Contact us</Nav.Link>
            <Nav.Link href="about">About us</Nav.Link>
          </Nav>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{color:"white"}}
            >
              Welcome {profile.first_name} {profile.last_name} {anchorEl?<FontAwesomeIcon className="iconCaret" icon={faCaretUp}/>:<FontAwesomeIcon className="iconCaret" icon={faCaretDown}/>}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={()=>setAnchorEl(null)}
            >
              <MenuItem >------------------------------------</MenuItem>
              <MenuItem onClick={getprofile}>My account</MenuItem>
              <MenuItem onClick={logout_user}>Logout</MenuItem>
            </Menu>
          </div>
        </Navbar>
      </>
    );
  }
  return (
    <>
      <Navbar bg="#3e0748" variant="dark" className="Navbar" >
        <Navbar.Brand href="/">Docto+</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/contact">Contact us</Nav.Link>
          <Nav.Link href="/about">About us</Nav.Link>
        </Nav>
        <Link to="/login" className="authBtn">Login</Link>
        <Link to="/register" className="authBtn">Register</Link>
      </Navbar>
    </>
  );
};

export default NavbarComp;
