import React from 'react'
import Sidebar from './SideBar/SideBar'
import './Home.css'
import ContainerP from './ContainerP/ContainerP'
import { Route, Switch, Redirect } from "react-router-dom";
import MyAppointments from './Appointment/MyAppointments';
import Profile from './Profile/Profile';
import SearchPage from './ContainerP/SearchPage'

const HomeP = () => {
    const userType = localStorage.getItem("userType")
    return (
        <>
        {userType==="patient"?
        <div className="P_Container">
            <Sidebar/>
            <Switch>
                <Route path="/patient" component={ContainerP} exact/>
                <Route path="/patient/appointments" component={MyAppointments} exact/>
                <Route path="/patient/profile" component={Profile} exact/>
                <Route path="/patient/search/:searchValue" component={SearchPage} exact/>
            </Switch>
       </div>
       :<Redirect to="/login"/> }
       </>
    )
}

export default HomeP