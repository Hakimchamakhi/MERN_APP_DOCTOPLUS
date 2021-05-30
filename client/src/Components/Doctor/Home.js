//import './Home.css'
import Sidebar from './SideBar/SideBar'
import ContainerP from './ContainerP/ContainerP'
import { Route, Switch, Redirect } from "react-router-dom";
import MyAppointments from './Appointment/MyAppointments';
import Profile from './Profile/Profile';
import SearchPage from './ContainerP/SearchPage'

const HomeD = () => {
    const userType = localStorage.getItem("userType")
    return (
        <>
        {userType==="doctor"?
        <div className="P_Container">
            <Sidebar/>
            <Switch>
                <Route path="/doctor" component={ContainerP} exact/>
                <Route path="/doctor/appointments" component={MyAppointments} exact/>
                <Route path="/doctor/profile" component={Profile} exact/>
                <Route path="/doctor/search/:searchValue" component={SearchPage} exact/>
            </Switch>
       </div>
       :<Redirect to="/login"/> }
       </>
    )
}

export default HomeD