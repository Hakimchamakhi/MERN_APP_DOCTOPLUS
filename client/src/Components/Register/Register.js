import { useFormik } from "formik";
import * as Yup from "yup";
import { apiRegisterPatient } from "../../api/patient";
import { apiRegisterDoctor } from "../../api/doctor";
import { AUTH_FAILED, AUTH_SUCCESS } from "../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {useState} from "react"

const Registerpage = () => {
  const [userType, setUserType] = useState("patient")
  const errormsg = useSelector((state) => state.auth.error);
  let history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) { history.push("/") }
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6)
  });
  const formik = useFormik({
    initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        address: "",
        cin: "",
        gender: "male",
        speciality: "Allergy and immunology",
        phone_number: ""
    },
    onSubmit: (values, bag) => {
      const Register_patient = async () => {
        try {
          const {data} = await apiRegisterPatient(values);
          const {_id, first_name, last_name, email, gender, address} = data.patient;
          const patient = {_id, first_name, last_name, email, gender, address}
          localStorage.setItem("x-auth-token", data.token);
          localStorage.setItem("profile", JSON.stringify(patient));
          localStorage.setItem("userType", "patient");
          dispatch({ type: AUTH_SUCCESS, payload: JSON.stringify(patient) });
          history.push("/patient")
        } catch (e) {
          dispatch({ type: AUTH_FAILED, payload: e.response.data.msg });
          bag.setSubmitting(false);
        }
      };
      const Register_doctor = async () => {
        try {
          const {data} = await apiRegisterDoctor(values);
          const {_id, first_name, last_name, email, gender, speciality, address} = data.doctor;
          const doctor = {_id, first_name, last_name, email, gender, speciality, address}
          localStorage.setItem("x-auth-token", data.token);
          localStorage.setItem("profile", JSON.stringify(doctor));
          localStorage.setItem("userType", "doctor");
          dispatch({ type: AUTH_SUCCESS, payload: JSON.stringify(doctor) });
          history.push("/doctor")
        } catch (e) {
          dispatch({ type: AUTH_FAILED, payload: e.response.data.msg });
          bag.setSubmitting(false);
        }
      };
      (userType==="patient")? Register_patient(values) : Register_doctor(values);
    },
    validationSchema
  });
  return (
    <div className="RegisterContainer">
      <form onSubmit={formik.handleSubmit}>
        <h3>Register</h3>
        {errormsg}
        <div className="form-group">
          <label>Are You A : </label>
          Patient
          <input
            type="radio"
            className="radio_box"
            name="userType"
            defaultChecked={true}
            onChange={()=>setUserType("patient")}
          />
          Doctor
          <input
            type="radio"
            className="radio_box"
            name="userType"
            onChange={()=>setUserType("doctor")}
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            placeholder="Enter first name"
            {...formik.getFieldProps("first_name")}
          />
        </div>
        {formik.touched.first_name && formik.errors.first_name ? (
          <div className="error">{formik.errors.first_name}</div>
        ) : null}

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Enter last name"
            {...formik.getFieldProps("last_name")}
          />
        </div>
        {formik.touched.last_name && formik.errors.last_name ? (
          <div className="error">{formik.errors.last_name}</div>
        ) : null}

        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter email"
            {...formik.getFieldProps("email")}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter password"
            {...formik.getFieldProps("password")}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Enter address"
            {...formik.getFieldProps("address")}
          />
        </div>
        {formik.touched.address && formik.errors.address ? (
          <div className="error">{formik.errors.address}</div>
        ) : null}

        <div className="form-group">
          <label>CIN</label>
          <input
            type="text"
            className="form-control"
            name="cin"
            placeholder="Enter CIN"
            {...formik.getFieldProps("cin")}
          />
        </div>
        {formik.touched.cin && formik.errors.cin ? (
          <div className="error">{formik.errors.cin}</div>
        ) : null}

        <div className="form-group">
          <label>Gender: </label>
          Male
          <input
            type="radio"
            className="radio_box"
            name="gender"
            defaultChecked={true}
            onChange={()=>formik.values.gender="male"}
          />
          Female
          <input
            type="radio"
            className="radio_box"
            name="gender"
            onChange={()=>formik.values.gender="female"}
          />
        </div>
        {userType === "doctor" ? (
         <div className="form-group">
         <label>speciality</label>
         <select name="speciality" {...formik.getFieldProps("speciality")}>
           <option value="Allergy and immunology" name="speciality" >Allergy and immunology</option>
           <option value="Anesthesiology" name="speciality" >Anesthesiology</option>
           <option value="Dentist" name="speciality" >Dentist</option>
           <option value="Dermatology" name="speciality" >Dermatology</option>
           <option value="Diagnostic radiology" name="speciality" >Diagnostic radiology</option>
           <option value="Family medicine" name="speciality" >Family medicine</option>
           <option value="Internal medicine" name="speciality" >Internal medicine</option>
           <option value="Medical genetics" name="speciality" >Medical genetics</option>
           <option value="Neurology" name="speciality" >Neurology</option>
           <option value="Obstetrics and gynecology" name="speciality" >Obstetrics and gynecology</option>
           <option value="Pediatrics" name="speciality" >Pediatrics</option>
           <option value="Psychiatry" name="speciality" >Psychiatry</option>
           <option value="Surgery" name="speciality" >Surgery</option>
          </select>
         {formik.touched.speciality && formik.errors.speciality ? (
        <div className="error">{formik.errors.speciality}</div>
        ) : null}
       </div> ) : null}
       

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone_number"
            placeholder="Enter phone number"
            {...formik.getFieldProps("phone_number")}
          />
        </div>
        {formik.touched.phone_number && formik.errors.phone_number ? (
          <div className="error">{formik.errors.phone_number}</div>
        ) : null}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          Submit
        </button>
        <p className="forgot-password text-right">
        You have an account?<a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Registerpage;
