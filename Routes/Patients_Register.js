const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Patient Model
const  Patient = require('../Models/Patient');

router.post('/', (req,res)=>{
    const {first_name, last_name, email, password, gender, address} = req.body;
    // check for existing patient
    Patient.findOne({email})
    .then(patient => {
        if(patient) return res.status(400).json({msg: 'Patient already exist!!'})
        const newPatient = new Patient({
            first_name,
            last_name,
            email,
            password,
            gender,
            address
        });
        //create salt & hash
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newPatient.password, salt, (err, hash)=>{
                if(err) res.json(err) ;
                newPatient.password = hash;
                newPatient.save()
                .then(patient => {
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
                });
            })
        })
    });
})

module.exports = router;