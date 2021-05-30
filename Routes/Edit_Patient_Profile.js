const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Patient Model
const Patient = require('../Models/Patient');

router.put('/:id', (req, res) => {
    const { first_name, last_name, email, password, address, cin, phone_number, gender } = req.body
    if (password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) res.json(err);
                req.body.password = hash;
                Patient.findByIdAndUpdate({ "_id": req.params.id }, req.body)
                .then(patient => {
                    if (patient) return res.status(200).json({ msg: 'Profile Updated' })
                })
                .catch(e => {
                    res.status(400).json({ msg: e })
                })
            })
        })
    }
    Patient.findByIdAndUpdate({ "_id": req.params.id }, { first_name, last_name, email, address, cin, phone_number, gender })
        .then(patient => {
            if (patient) return res.status(200).json({ msg: 'Profile Updated' })
        })
        .catch(e => {
            res.status(400).json({ msg: e })
        })

})

module.exports = router;