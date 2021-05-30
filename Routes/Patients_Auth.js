const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Patient Model
const  Patient = require('../Models/Patient');

router.post('/', (req,res)=>{
    const {email, password} = req.body;
    // check for existing patient
    Patient.findOne({email})
    .then(patient => {
        if(!patient) return res.status(400).json({msg: 'Patient does not exist!!'})
        // validate password
        bcrypt.compare(password, patient.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg: 'Invalide Password'});
            jwt.sign(
                { id: patient.id},
                process.env.jwt_secret,
                {expiresIn: '7d'},
                (err, token)=> {
                    if(err) throw err;
                    res.json({
                        token,
                        patient
                    });
                }
            )
        })
    });
})

module.exports = router;