const mongoose=require('mongoose');
//Create a Patient having this prototype:
const PatientSchema = mongoose.Schema({
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
        type:String //, required:true
    },/*
    cin:{
        type:String //, required:true, unique:true
    },*/
    gender:{
        type:String //, required:true
    },/*
    phone_number:{
        type:String , required:true
    },*/
    register_date:{
        type:Date, default:Date.now
    }
}); 

module.exports = mongoose.model('Patients',PatientSchema);