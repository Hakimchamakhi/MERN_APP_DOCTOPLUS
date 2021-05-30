const express = require('express');
const router = express.Router();

// Doctor Appointment
const  Appointment = require('../Models/Appointment');

router.post('/', (req,res)=>{
    const {p_id, p_name, p_cin, p_gender, p_phone_number, d_id, d_name, d_speciality, d_address, appoint_date, appoint_time} = req.body;
    // check for existing patient
    Appointment.findOne({"d_id": d_id, "appoint_date": appoint_date, "appoint_time": appoint_time})
    .then(appointment => {
        if(appointment) return res.status(400).json({msg: 'Appointment Already Taken!! Please Change Time'})
        const newAppointment = new Appointment({
            p_id, p_name, p_cin, p_gender, 
            p_phone_number, d_id, d_name, 
            d_speciality, d_address, appoint_date, appoint_time
        });
        newAppointment.save()
    });
});

module.exports = router;