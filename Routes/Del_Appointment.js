const express = require('express');
const router = express.Router();

// Appointment Model
const  Appointment = require('../Models/Appointment');

router.delete('/', (req,res)=>{
    const {_id} =  req.query
    Appointment.deleteOne({_id}, function(err, obj) {
        if (err) throw err;
    })
});

module.exports = router;