import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import "./Profile.css"
import swal from 'sweetalert';

const Profile = () => {
    const profile = JSON.parse(localStorage.getItem("profile"))
  const validationSchema = Yup.object({
    email: Yup.string().email(),
    password: Yup.string().min(6)
  });
  const formik = useFormik({
    initialValues: {
        id : profile.id,
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        password: "",
        gender:profile.gender,
        address: profile.address || "",
        cin: profile.cin || "",
        phone_number: profile.phone_number || ""
    },
    onSubmit: (values, bag) => {
      const Edit_patient = async () => {
        try {
          const d_profile = JSON.parse(localStorage.getItem("profile"))
          const d_id = d_profile._id
          const res = await axios.put(`http://localhost:5000/edit_patient_profile/${d_id}`, values);
          localStorage.setItem("profile", JSON.stringify(values))
          await swal("success", res.data.msg, "success")
          window.location.reload();
        } catch (e) {
          swal("Error", e , "error")
          bag.setSubmitting(false);
        }
      };
      Edit_patient(values)
    },
    validationSchema
  });
  return (
    <div className="ProfileContainer" style={{maxWidth:800,marginLeft:"auto",marginRight:"auto"}}>
      <form onSubmit={formik.handleSubmit}>
        <div className="fullname">
        <div className="form-group" style={{width:"50%",marginRight:20}}>
          <label>First Name</label>
          <input
            type="text"
            className="form-control fname"
            name="first_name"
            placeholder="Enter first name"
            {...formik.getFieldProps("first_name")}
          />
        </div>
        {formik.touched.first_name && formik.errors.first_name ? (
          <div className="error">{formik.errors.first_name}</div>
        ) : null}

        <div className="form-group" style={{width:"50%"}}>
          <label>Last Name</label>
          <input
            type="text"
            className="form-control lname"
            name="last_name"
            placeholder="Enter last name"
            {...formik.getFieldProps("last_name")}
          />
        </div>
        {formik.touched.last_name && formik.errors.last_name ? (
          <div className="error">{formik.errors.last_name}</div>
        ) : null}
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
      </form>
    </div>
  );
};

export default Profile;

