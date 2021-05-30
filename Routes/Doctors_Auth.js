const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Doctor Model
const  Doctor = require('../Models/Doctor');

router.post('/', (req,res)=>{
    const {email, password} = req.body;
    // check for existing doctor
    Doctor.findOne({email})
    .then(doctor => {
        if(!doctor) return res.status(400).json({msg: 'Doctor does not exist!!'})
        // validate password
        bcrypt.compare(password, doctor.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg: 'Invalide Password'});
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
        })
    });
})

module.exports = router;