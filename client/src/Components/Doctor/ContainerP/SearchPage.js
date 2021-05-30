import { useSelector, useDispatch } from "react-redux";
import {useState} from "react"
import { Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import Appointment from '../Appointment/Appointment'
import {TOGGLE_APPOINT} from '../../../actions/types'
import { Pagination } from '@material-ui/lab';

const SearchPage = (props) => {
    const {searchValue} = props.match.params
    let pag = false;
    let np = 1;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    let patients = useSelector((state) => state.data_red.patients);
    const patient = patients.filter(x=>x.p_name.includes(searchValue))
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    (patient.length/9)<=1? pag=true : np= Math.floor(patient.length/9)+1
    let docPage = patient.slice((page-1)*9, (page-1)*9+9);

    return (
        <div className="testc">
            <Table striped bordered hover style={{margin:10}}>
                <thead>
                    <tr>
                    <th>Patient Name</th>
                    <th>CIN</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Get An Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    {patient.length>0? docPage.map((el, index) => {
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
            {patient.length<1?<Alert variant='danger' style={{width:500,textAlign:"center",marginLeft:"auto",marginRight:"auto"}}> Sorry There Is No Patients With This Name</Alert>:null}
            <Appointment/>
            <Pagination count={np} disabled={pag} page={page} onChange={handleChangePage} />
        </div>
    )
}

export default SearchPage
