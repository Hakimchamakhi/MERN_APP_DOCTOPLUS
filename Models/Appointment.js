const mongoose=require('mongoose');
//Create a Appointment having this prototype:
const AppointmentSchema = mongoose.Schema({
    p_id:{
        type:String, required:true
    },
    p_name:{
        type:String, required:true
    },
    p_cin:{
        type:String , required:true
    },
    p_gender:{
        type:String, required:true
    },
    p_phone_number:{
        type:String, required:true
    },
    d_id:{
        type:String, required:true
    },
    d_name:{
        type:String, required:true
    },
    d_speciality:{
        type:String, required:true
    },
    d_address:{
        type:String, required:true
    },
    appoint_date:{
        type:String, required:true
    },
    appoint_time:{
        type:String, required:true
    }
}); 

module.exports = mongoose.model('Appointments',AppointmentSchema);