const express = require('express');
const router = express.Router();

// Appointment Model
const  Appointment = require('../Models/Appointment');

router.get('/', (req,res)=>{
    const {id} =  req.query
    Appointment.find({"d_id": id}).sort({appoint_date: 1})
    .then(appointment => {
        if(appointment) return res.json({appoint: appointment})
    })
});

module.exports = router;