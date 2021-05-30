import { useSelector, useDispatch} from "react-redux";
import { Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { MY_APPOINTMENTS } from "../../../actions/types";
import swal from 'sweetalert';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Pagination } from '@material-ui/lab';

const MyAppointments = () => {
    const dispatch = useDispatch()
    let pag = false;
    let np = 1;
    const id = useSelector((state) => state.auth.profile._id);
    const [page, setPage] = useState(1);
    const my_appoint = async () => {
        const res = await axios.get('http://localhost:5000/my_appoint_d',{ params: { id }});
        const {appoint}  = res.data;
        dispatch({ type: MY_APPOINTMENTS , payload: appoint });
    }
    useEffect(() => {
        my_appoint()
      });
    
    let appointment = useSelector((state) => state.data_red.my_appointments);
    const api_delete_appoint = (_id) =>{
        axios.delete('http://localhost:5000/del_appoint',{ params: { _id }})
    }
    const delete_appoint = ({p_name,_id,appoint_date,appoint_time}) => () => {
        swal({
            title: "Are you sure?",
            text: `Are you Sure, you want to cancel your appointment with ${p_name} on ${appoint_date} ${appoint_time}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                api_delete_appoint(_id)
            }
            })
    }
    (appointment.length/9)<=1? pag=true : np= Math.floor(appointment.length/9)+1
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    let appointpage = appointment.slice((page-1)*9, (page-1)*9+9);
    return (
        <div className="myappointments">
            <Table striped bordered hover style={{margin:10}}>
                <thead>
                    <tr>
                    <th>Patient Name</th>
                    <th>CIN</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Cancel Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    {appointment.length>0? appointpage.map((el, index) => {
                        return (
                            <tr key={index}>
                            <td>{el.p_name}</td>
                            <td>{el.p_cin}</td>
                            <td>{el.p_gender}</td>
                            <td>{el.p_phone_number}</td>
                            <td>{el.appoint_date}</td>
                            <td>{el.appoint_time}</td>
                            <td className="tdIcon"><FontAwesomeIcon className="iconAppoint" icon={faTrashAlt} onClick={delete_appoint(el)} style={{color:"#ea1d63"}}/></td>
                            </tr>
                        )
                    }):null}
                </tbody>
            </Table>
            {appointment.length<1?<Alert variant='danger' style={{width:500,textAlign:"center",marginLeft:"auto",marginRight:"auto"}}> You Have No Appointmets</Alert>:null}
            <Pagination count={np} disabled={pag} page={page} onChange={handleChangePage} />
        </div>
    )
}

export default MyAppointments
