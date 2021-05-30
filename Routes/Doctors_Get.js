const express = require('express');
const router = express.Router();

// Doctor Model
const  Doctor = require('../Models/Doctor');

router.get('/', (req,res)=>{
    Doctor.find().sort({speciality: 1})
    .then(doctor => {
        if(doctor) return res.json({doc: doctor})
    })
});

module.exports = router;