const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Doctor Model
const  Doctor = require('../Models/Doctor');

router.post('/', (req,res)=>{
    const {first_name, last_name, email, password, gender, speciality, address} = req.body;
    // check for existing doctor
    Doctor.findOne({email})
    .then(doctor => {
        if(doctor) return res.status(400).json({msg: 'Doctor already exist!!'})
        const newDoctor = new Doctor({
            first_name,
            last_name,
            email,
            password,
            gender,
            speciality,
            address
        });
        //create salt & hash
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newDoctor.password, salt, (err, hash)=>{
                if(err) throw err;
                newDoctor.password = hash;
                newDoctor.save()
                .then(doctor => {
                    jwt.sign(
                        { id: doctor.id},
                        process.env.jwt_secret,
                        {expiresIn: '7d'},
                        (err, token)=> {
                            if(err) throw err;
                            res.json({
                                token,
                                doctor
                            });
                        }
                    )
                });
            })
        })
    });
})

module.exports = router;