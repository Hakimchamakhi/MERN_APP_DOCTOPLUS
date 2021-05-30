import './App.css';
import Loginpage from './Components/Login/Login';
import NavbarComp from './Components/Navbar/Navbar';
import { Route , Switch, BrowserRouter } from "react-router-dom";
import Home from './Components/Home/Home';
import HomeP from './Components/Patient/Home'
import HomeD from './Components/Doctor/Home'
import { useEffect } from 'react';
import { useDispatch} from "react-redux";
import { AUTH_FAILED, AUTH_SUCCESS } from './actions/types';
import Registerpage from './Components/Register/Register';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      !(localStorage.getItem("x-auth-token")) ? dispatch({ type: AUTH_FAILED, payload: "You Need To Login!!" }) : dispatch({ type: AUTH_SUCCESS, payload: localStorage.getItem("profile")}) ;
  });
  return (
    <BrowserRouter>
    <div className="App">
      <NavbarComp/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Loginpage} exact/>
        <Route path="/register" component={Registerpage} exact/>
        <Route path="/patient" component={HomeP} />
        <Route path="/doctor" component={HomeD} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
