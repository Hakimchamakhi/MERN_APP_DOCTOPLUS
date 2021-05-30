const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const PORT= process.env.PORT || 5000;
const app = express();
//Connect to DataBase
mongoose.connect(process.env.MONGO_URI,
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false},
  ()=>{
      console.log('connected to Database');
});

app.use(cors())


//GET 
app.get('/', (req, res) => {
  res.send('hello world')
})

// use route
app.use('/patients', require('./Routes/Patients_Register'))
app.use('/doctors', require('./Routes/Doctors_Register'))

app.use('/p_auth', require('./Routes/Patients_Auth'))
app.use('/d_auth', require('./Routes/Doctors_Auth'))
app.use('/d_spec', require('./Routes/Doctors_Specialities'))
app.use('/d_get', require('./Routes/Doctors_Get'))
app.use('/t_appoint', require('./Routes/Appointment'))
app.use('/my_appoint', require('./Routes/MyAppointments'))
app.use('/my_appoint_d', require('./Routes/MyAppointments_d'))
app.use('/del_appoint', require('./Routes/Del_Appointment'))
app.use('/edit_patient_profile', require('./Routes/Edit_Patient_Profile'))
app.use('/edit_doctor_profile', require('./Routes/Edit_Doctor_Profile'))
app.use('/admin', require('./Routes/Admin'))

//Body-Parser Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))