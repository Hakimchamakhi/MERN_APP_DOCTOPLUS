import { useFormik } from "formik";
import * as Yup from "yup";
import {apiLoginPatient} from '../../api/patient'
import {apiLoginDoctor} from '../../api/doctor'
import { AUTH_FAILED, AUTH_SUCCESS } from '../../actions/types';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {useState} from "react"

const Loginpage = () => {
  const [userType, setUserType] = useState("patient")
  let history = useHistory();
  const isAuth = useSelector(state => state.auth.isAuth)
  if (isAuth) {history.push("/")};
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, bag) => {
      const login_patient = async () => {
        try {
          const {data} = await apiLoginPatient(values);
          const {_id, first_name, last_name, email, gender, address} = data.patient;
          const patient = {_id, first_name, last_name, email, gender, address}
          localStorage.setItem("x-auth-token", data.token);
          localStorage.setItem("profile", JSON.stringify(patient));
          localStorage.setItem("userType", "patient");
          dispatch({ type: AUTH_SUCCESS, payload: JSON.stringify(patient) });
          history.push("/patient")
        } catch (e) {
          dispatch({ type: AUTH_FAILED, payload: e.response.data.msg });
          bag.setSubmitting(false)
        }
      };
      const login_doctor = async () => {
        try {
          const {data} = await apiLoginDoctor(values);
          const {_id, first_name, last_name, email, gender, speciality, address} = data.doctor;
          const doctor = {_id, first_name, last_name, email, gender, speciality, address}
          localStorage.setItem("x-auth-token", data.token);
          localStorage.setItem("profile", JSON.stringify(doctor));
          localStorage.setItem("userType", "doctor");
          dispatch({ type: AUTH_SUCCESS, payload: JSON.stringify(doctor) });
          history.push("/doctor")
        } catch (e) {
          dispatch({ type: AUTH_FAILED, payload: e.response.data.msg });
          bag.setSubmitting(false)
        }
      };
      (userType==="patient")? login_patient(values) : login_doctor(values);
    },
    validationSchema,
  });

  return (
    <div className="loginContainer">
      <form onSubmit={formik.handleSubmit}>
        <h3>Login</h3>
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

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          You dont have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Loginpage;