//import './SideBar.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserCog, faSignOutAlt, faUser, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { USER_LOGGED_OUT, GET_PATIENTS, MY_APPOINTMENTS} from '../../../actions/types';
import axios from 'axios';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  const id = useSelector((state) => state.auth.profile._id);
  const my_appoint = async () => {
      const res = await axios.get('http://localhost:5000/my_appoint_d',{ params: { id }});
      const {appoint}  = res.data;
      dispatch({ type: MY_APPOINTMENTS , payload: appoint });
  }
  const GetPatients = async () => {
    const res = await axios.get('http://localhost:5000/my_appoint_d',{ params: { id }});
    const {appoint}  = res.data;
    dispatch({ type: GET_PATIENTS , payload: appoint });
  }
  GetPatients()
  const logout_user = () => {
    localStorage.clear();
    dispatch({type: USER_LOGGED_OUT })
    history.push("/")
  }
  return (
        <div className="navigation" >
          <div className="searchBox" >
            <FontAwesomeIcon className="iconSearch" icon={faSearch}/>
            <form onSubmit={(e)=>{e.preventDefault() ;history.push(`/doctor/search/${search}`)}} style={{padding:0, margin:0}}>
              <input
                type="text"
                className="search"
                value={search}
                placeholder="Enter Patient name" 
                onChange={(e)=>{setSearch(e.target.value)}} />
            </form>
          </div>
          <div className="categoryBox" onClick={GetPatients}>
            <FontAwesomeIcon className="iconCategory" icon={faUser}/>
            <Link to="/doctor" className="category" >Show Patients</Link>
          </div>
          <div className="AppointmentBox" onClick={my_appoint}>
            <FontAwesomeIcon className="iconAppointment" icon={faCalendarCheck}/>
            <Link to="/doctor/appointments" className="AppointmentSetting" >My Appointments</Link>
          </div>
          <div className="AccountBox">
            <FontAwesomeIcon className="iconAccount" icon={faUserCog}/>
            <Link to="/doctor/profile" className="accountSetting" >Account Settings</Link>
          </div>
          <div className="logOutBox">
            <FontAwesomeIcon className="iconLogOut" icon={faSignOutAlt}/>
            <span className="logOutSetting" onClick={logout_user} >Logout</span>
          </div>
        </div>
  );
};

export default Sidebar;