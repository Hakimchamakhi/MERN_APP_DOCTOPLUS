const express = require('express');
const router = express.Router();

// Doctor Model
const  Doctor = require('../Models/Doctor');

router.get('/', (req,res)=>{
    Doctor.distinct( "speciality" )
    .then(doctor => {
        if(doctor) return res.json({spec: doctor})
    })
});

module.exports = router;