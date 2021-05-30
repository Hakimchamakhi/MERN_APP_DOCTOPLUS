import { useSelector, useDispatch } from "react-redux";
import {useState} from "react"
import { Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import Appointment from '../Appointment/Appointment'
import {TOGGLE_APPOINT} from '../../../actions/types'
import { Pagination } from '@material-ui/lab';
import './ContainerP.css'

const ContainerP = () => {
    let pag = false;
    let np = 1;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [tog, setTog] = useState(false);
    const [gender, setGender] = useState("male");
    const patient = useSelector((state) => state.data_red.patients);
    let pat = patient.map(x=>{
        const {p_id, p_name, p_cin, p_gender, p_phone_number}= x
        const p = {p_id,p_name, p_cin, p_gender, p_phone_number}
        return{p}
    })
    const patients = pat.map(x=>x.p)
    const submitting = () =>{
        const patientdata = {
            "p_id": (Math.random()*1000000000000).toString(),
            "p_name":document.getElementsByName("name")[0].value,
            "p_cin" :document.getElementsByName("cin")[0].value,
            "p_phone_number" :document.getElementsByName("phone")[0].value,
            "p_gender": gender
        }
        setTog(false)
        dispatch({type:TOGGLE_APPOINT, payload:patientdata})
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    (patients.length/9)<=1? pag=true : np= Math.floor(patients.length/9)+1
    let patPage = patients.slice((page-1)*9, (page-1)*9+9);
    return (
        <div className="testc">
            <div>
                <span className="addSpan" onClick={()=>setTog(!tog)}>ADD Appointment to a new User</span>
                {tog && (
                <>
                    <form onSubmit={submitting} >
                    <label>Patient full name : <input type="text" name="name" /></label>
                    <label>Patient CIN : <input type="text" name="cin" /></label>
                    <label>Patient Phone : <input type="text" name="phone" /></label><br/>
                    <label>Patient Gender: 
                        Male
                        <input
                            type="radio"
                            className="radio_box"
                            name="userType"
                            defaultChecked={true}
                            onChange={()=>setGender("male")}
                        />
                        Female
                        <input
                            type="radio"
                            className="radio_box"
                            name="userType"
                            onChange={()=>setGender("female")}/>
                    </label>
                    <input className="btn" type="submit" value="Submit" />
                    </form>
                </>
            )}
            </div>
            <Table striped bordered hover style={{margin:10}}>
                <thead>
                    <tr>
                    <th>Patient Name</th>
                    <th>CIN</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Add An Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length>0? patPage.map((el, index) => {
                        return (
                            <tr key={index}>
                            <td>{el.p_name}</td>
                            <td>{el.p_cin}</td>
                            <td>{el.p_gender}</td>
                            <td>{el.p_phone_number}</td>
                            <td className="tdIcon"><FontAwesomeIcon className="iconAppoint" onClick={() => dispatch({type:TOGGLE_APPOINT, payload:el})}  icon={faClipboardList}/></td>
                            </tr>
                        )
                    }):null}
                </tbody>
            </Table>
            {patients.length<1?<Alert variant='danger' style={{width:500,textAlign:"center",marginLeft:"auto",marginRight:"auto"}}> Sorry You Have No Patients</Alert>:null}
            <Appointment/>
            <Pagination count={np} disabled={pag} page={page} onChange={handleChangePage} />
        </div>
    )
}

export default ContainerP
