import {Modal, Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import {TOGGLE_APPOINT} from '../../../actions/types'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import swal from 'sweetalert';
import axios from 'axios';

const Appointment = () => {
    const show = useSelector((state) => state.data_red.model_appoint);
    const doctor = useSelector((state) => state.auth.profile);
    const patient = useSelector((state) => state.data_red.appoint_doc);
    const [value, onChange] = useState(new Date());
    const [time, onTime] = useState("");
    var date = value.getFullYear()+'-'+(value.getMonth()+1)+'-'+value.getDate();
    const appoint = {
      "p_id": (patient)?patient.p_id:"" , "p_name": (patient)?patient.p_name : "", "p_cin": "12345678", "p_gender": (patient)?patient.p_gender:"", "p_phone_number": "50505858", 
      "d_id": doctor._id , "d_name":(doctor.first_name+" "+doctor.last_name) ,"d_speciality": doctor.speciality, "d_address": doctor.address,
      "appoint_date": date, "appoint_time": time 
    }
   
    const dispatch = useDispatch();
    const handleModel = () => dispatch({type:TOGGLE_APPOINT});
    const changeTime = async (e) => {
      onTime(e.target.value)
    }
    const confirmAppoint = async () => {
      dispatch({type:TOGGLE_APPOINT})
      try{
        swal("Appointment success", "You can now see it from your appointments", "success")
        await axios.post('http://localhost:5000/t_appoint', appoint);
      }catch(e){
        swal("Appointment error", e.response.data.msg , "error")
      }
    }; 
    
    return (
      <>
        <Modal
          show={show}
          onHide={handleModel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Get An Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                <label>Choose a date : {date}</label>
                <Calendar onChange={onChange} value={value} tileDisabled={({date, view }) => (date.getDay()===0)||(date.getDay()===6)} 
                minDate={new Date()} maxDate={new Date(new Date().getFullYear(), new Date().getMonth()+4, new Date().getDay())} 
                />
            </div>
            <div>
                <label>Choose a time : {time}</label><br/>
                <Button variant="primary" value="08:00" onClick={changeTime}>08:00</Button>
                <Button variant="primary" value="08:30" onClick={changeTime}>08:30</Button>
                <Button variant="primary" value="09:00" onClick={changeTime}>09:00</Button>
                <Button variant="primary" value="09:30" onClick={changeTime}>09:30</Button>
                <Button variant="primary" value="10:00" onClick={changeTime}>10:00</Button>
                <Button variant="primary" value="10:30" onClick={changeTime}>10:30</Button>
                <Button variant="primary" value="11:00" onClick={changeTime}>11:00</Button>
                <Button variant="primary" value="11:30" onClick={changeTime}>11:30</Button>
                <Button variant="primary" value="15:00" onClick={changeTime}>15:00</Button>
                <Button variant="primary" value="15:30" onClick={changeTime}>15:30</Button>
                <Button variant="primary" value="16:00" onClick={changeTime}>16:00</Button>
                <Button variant="primary" value="16:30" onClick={changeTime}>16:30</Button>
                <Button variant="primary" value="17:00" onClick={changeTime}>17:00</Button>
                <Button variant="primary" value="17:30" onClick={changeTime}>17:30</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmAppoint}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
export default Appointment
