import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Input } from "../component/base/index";

function Register() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Minimum 3 characters.").required("Required"),
      email: Yup.string().email("Invalid email format.").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters.")
        .required("Required"),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .post(`${Url}/api/register`, values)
        .then((res) => {
          setLoading(false);
          action.setValues({ name: "", email: "", password: "" });
          Swal.fire({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        });
    },
  });

  const Url = process.env.REACT_APP_API_URL;
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  let confirmEmail = query.get("email");
  let confirmToken = query.get("token");

  if (isLoading) {
    Swal.fire({
      icon: "info",
      title: "Loading!",
      text: "Please wait",
      showConfirmButton: false,
    });
  }

  useEffect(() => {
    if (confirmToken !== null && confirmEmail !== null) {
      setLoading(true);
      axios
        .get(`${Url}/api/activate/${confirmToken}/${confirmEmail}`)
        .then((res) => {
          setLoading(false);
          Swal.fire({
            title: "Success!",
            text: "Success activating account.",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/");
            } else {
              history.push("/");
            }
          });
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error!",
            text: "Failed activating account.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        });
    }
  }, [Url, confirmEmail, confirmToken]);

  return (
    <div className="bg-all overflow-auto">
      <div className="h-100vh container-md container-fluid">
        <div className="h-100 d-flex justify-content-center row no-gutters">
          <div className="col-md-5 align-self-center">
            <div className="card border-0 px-5 py-3 br-30px shadow">
              <div className="d-flex w-100">
                <Link to="/">
                  <h4 className="text-blue my-3 position-absolute">
                    <i className="fas fa-chevron-left"></i>
                  </h4>
                </Link>
                <h4 className="text-center text-blue my-3 w-100">Register</h4>
              </div>

              <p className="font-weight-bold my-3 text-black">
                Let’s create your account!
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label className="m-0 text-gray">Name</label>
                  <Input
                    type="text"
                    className="border-top-0 border-left-0 border-right-0 border-outline"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    required
                  ></Input>
                  {formik.errors.name && formik.touched.name && (
                    <small className="text-danger">{formik.errors.name}</small>
                  )}
                </div>
                <div className="form-group">
                  <label className="m-0 text-gray">Email</label>
                  <Input
                    type="email"
                    className="border-top-0 border-left-0 border-right-0 border-outline"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  ></Input>
                  {formik.errors.email && formik.touched.email && (
                    <small className="text-danger">{formik.errors.email}</small>
                  )}
                </div>

                <div className="form-group">
                  <label className="m-0 text-gray">Password</label>
                  <Input
                    type="password"
                    className="border-top-0 border-left-0 border-right-0 border-outline"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
                  ></Input>
                  {formik.errors.password && formik.touched.password && (
                    <small className="text-danger">
                      {formik.errors.password}
                    </small>
                  )}
                </div>

                <Button
                  className="btn-lg btn-blue btn-block rounded-btn mt-4"
                  onClick={formik.handleSubmit}
                >
                  Register
                </Button>
                <div className="row py-4">
                  <div className="col">
                    <hr />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <span className="align-self-center text-gray text-center">
                      Register With
                    </span>
                  </div>
                  <div className="col">
                    <hr />
                  </div>
                </div>
                <Button className="btn-lg btn-outline-blue btn-block rounded-btn text-blue">
                  <i className="fab fa-google"></i> Google
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
