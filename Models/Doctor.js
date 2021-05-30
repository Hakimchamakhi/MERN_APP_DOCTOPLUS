const mongoose=require('mongoose');
//Create a Doctor having this prototype:
const DoctorSchema = mongoose.Schema({
    first_name:{
        type:String, required:true
    },
    last_name:{
        type:String, required:true
    },
    email:{
        type:String, required:true, unique:true
    },
    password:{
        type:String, required:true
    },
    address:{
        type:String, required:true
    },
    speciality:{
        type:String, required:true
    },
    gender:{
        type:String, required:true
    },/*
    cin:{
        type:String, required:true, unique:true
    },
    phone_number:{
        type:String , required:true
    },*/
    register_date:{
        type:Date, default:Date.now
    }
}); 

module.exports = mongoose.model('Doctors',DoctorSchema);