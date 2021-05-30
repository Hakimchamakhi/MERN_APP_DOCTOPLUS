const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Doctor Model
const Doctor = require('../Models/Doctor');

router.put('/:id', (req, res) => {
    const { first_name, last_name, email, password, address, speciality, cin, phone_number, gender } = req.body
    if (password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) res.json(err);
                req.body.password = hash;
                Doctor.findByIdAndUpdate({ "_id": req.params.id }, req.body)
                .then(doctor => {
                    if (doctor) return res.status(200).json({ msg: 'Profile Updated' })
                })
                .catch(e => {
                    res.status(400).json({ msg: e })
                })
            })
        })
    }
    Doctor.findByIdAndUpdate({ "_id": req.params.id }, { first_name, last_name, email, speciality, address, cin, phone_number, gender })
        .then(doctor => {
            if (doctor) return res.status(200).json({ msg: 'Profile Updated' })
        })
        .catch(e => {
            res.status(400).json({ msg: e })
        })

})

module.exports = router;