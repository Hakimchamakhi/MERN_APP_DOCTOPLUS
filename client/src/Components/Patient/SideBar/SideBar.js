import './SideBar.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserCog, faSignOutAlt, faUserMd, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DOCTORS_SPECIALITIES, USER_LOGGED_OUT, GET_DOCTORS, FILTER_C, MY_APPOINTMENTS} from '../../../actions/types';
import axios from 'axios';

const Sidebar = () => {
  const [subnav, setSubnav] = useState(false);
  const [search, setSearch] = useState("");
  const spec = useSelector((state) => state.data_red.spec);
  const dispatch = useDispatch();
  let history = useHistory();
  const id = useSelector((state) => state.auth.profile.id);
  const my_appoint = async () => {
      const res = await axios.get('http://localhost:5000/my_appoint',{ params: { id }});
      const {appoint}  = res.data;
      dispatch({ type: MY_APPOINTMENTS , payload: appoint });
  }
  const DoctorSpec = async () => {
    const res = await axios.get('http://localhost:5000/d_spec');
    const {spec}  = res.data;
    dispatch({ type: DOCTORS_SPECIALITIES , payload: spec });
    setSubnav(!subnav)
  }
  const GetDoctors = async () => {
    const res = await axios.get('http://localhost:5000/d_get');
    const {doc}  = res.data;
    dispatch({ type: GET_DOCTORS , payload: doc });
  }
  GetDoctors()
  const logout_user = () => {
    localStorage.clear();
    dispatch({type: USER_LOGGED_OUT })
    history.push("/home")
  }
  return (
        <div className="navigation" >
          <div className="searchBox" >
            <FontAwesomeIcon className="iconSearch" icon={faSearch}/>
            <form onSubmit={(e)=>{e.preventDefault() ;history.push(`/patient/search/${search}`)}} style={{padding:0, margin:0}}>
              <input
                type="text"
                className="search"
                value={search}
                placeholder="Enter Dr name" 
                onChange={(e)=>{setSearch(e.target.value)}} />
            </form>
          </div>
          <div className="categoryBox" onClick={DoctorSpec}>
            <FontAwesomeIcon className="iconCategory" icon={faUserMd}/>
            <Link to="/patient" className="category" >Find a Doctor</Link>
          </div>
          <div className="ul">
            {subnav && spec.map((el, index) => {
              return <div key={index} className="categoriesBox" onClick={()=>dispatch({ type: FILTER_C , payload: el })}>{el}</div>;
            })}
          </div>
          <div className="AppointmentBox" onClick={my_appoint}>
            <FontAwesomeIcon className="iconAppointment" icon={faCalendarCheck}/>
            <Link to="/patient/appointments" className="AppointmentSetting" >My Appointments</Link>
          </div>
          <div className="AccountBox">
            <FontAwesomeIcon className="iconAccount" icon={faUserCog}/>
            <Link to="/patient/profile" className="accountSetting" >Account Settings</Link>
          </div>
          <div className="logOutBox">
            <FontAwesomeIcon className="iconLogOut" icon={faSignOutAlt}/>
            <span className="logOutSetting" onClick={logout_user} >Logout</span>
          </div>
        </div>
  );
};

export default Sidebar;