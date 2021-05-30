import { useSelector, useDispatch } from "react-redux";
import {useState} from "react"
import { Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import Appointment from '../Appointment/Appointmet'
import {TOGGLE_APPOINT} from '../../../actions/types'
import { Pagination } from '@material-ui/lab';

const SearchPage = (props) => {
    const {searchValue} = props.match.params
    let pag = false;
    let np = 1;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    let doc = useSelector((state) => state.data_red.doc);
    const doctors = doc.filter(x=>searchValue===x.first_name || searchValue=== x.last_name || searchValue=== x.first_name+" "+x.last_name)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    (doctors.length/9)<=1? pag=true : np= Math.floor(doctors.length/9)+1
    let docPage = doctors.slice((page-1)*9, (page-1)*9+9);

    return (
        <div className="testc">
            <Table striped bordered hover style={{margin:10}}>
                <thead>
                    <tr>
                    <th>Dr. Name</th>
                    <th>Speciality</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Get An Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.length>0? docPage.map((el, index) => {
                        return (
                            <tr key={index}>
                            <td>{"Dr. "+el.first_name+" "+el.last_name}</td>
                            <td>{el.speciality}</td>
                            <td>{el.address}</td>
                            <td>{el.gender}</td>
                            <td className="tdIcon"><FontAwesomeIcon className="iconAppoint" onClick={() => dispatch({type:TOGGLE_APPOINT, payload:el})}  icon={faClipboardList}/></td>
                            </tr>
                        )
                    }):null}
                </tbody>
            </Table>
            {doctors.length<1?<Alert variant='danger' style={{width:500,textAlign:"center",marginLeft:"auto",marginRight:"auto"}}> Sorry There Is No Doctors With This Name</Alert>:null}
            <Appointment/>
            <Pagination count={np} disabled={pag} page={page} onChange={handleChangePage} />
        </div>
    )
}

export default SearchPage
