import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { Button, Input } from "../component/base";

function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const Url = process.env.REACT_APP_API_URL;
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  let confirmEmail = query.get("email");
  let confirmToken = query.get("token");

  const handleReset = (event) => {
    event.preventDefault();
    if (password !== "") {
      setLoading(true);
      axios
        .get(
          `${Url}/api/resetPassword/${confirmToken}/${confirmEmail}/${password}`
        )
        .then((res) => {
          setLoading(false);
          setEmail("");
          setPassword("");

          Swal.fire({
            title: "Success!",
            text: res.data.message,
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
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        });
    } else {
      Swal.fire({
        title: "Info!",
        text: "Please fill new password",
        icon: "info",
        confirmButtonText: "Ok",
        confirmButtonColor: "#7E98DF",
      });
    }
  };

  const handleSend = (event) => {
    const data = {
      email,
    };

    event.preventDefault();
    if (email !== "") {
      setLoading(true);
      axios
        .post(`${Url}/api/forgotPassword`, data)
        .then((res) => {
          setLoading(false);
          setEmail("");
          setPassword("");

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
    } else {
      Swal.fire({
        title: "Info!",
        text: "Please fill email",
        icon: "info",
        confirmButtonText: "Ok",
        confirmButtonColor: "#7E98DF",
      });
    }
  };

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
      setShowPassword(true);
    }
  }, [confirmEmail, confirmToken]);

  return (
    <div className="bg-all overflow-auto">
      <div className="h-100vh container-md container-fluid">
        <div className="h-100 d-flex justify-content-center row no-gutters">
          <div className=" col-md-5 align-self-center">
            <div className="card h-content border-0 px-5 py-3 br-30px shadow">
              <div className="d-flex w-100">
                <Link to="/">
                  <h4 className="text-blue my-3 position-absolute">
                    <i className="fas fa-chevron-left"></i>
                  </h4>
                </Link>
                <h4 className="text-center text-blue my-3 w-100">
                  Forgot Password
                </h4>
              </div>

              <p className="font-weight-bold my-3 text-black">
                {`${
                  showPassword === false
                    ? "You’ll get messages soon on your e-mail"
                    : "You will have to set your new password"
                }`}
              </p>
              <form
                onSubmit={showPassword === false ? handleSend : handleReset}
              >
                {showPassword === false ? (
                  <div className="form-group">
                    <label className="m-0 text-gray">Email</label>
                    <Input
                      type="email"
                      className="border-outline"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></Input>
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="m-0 text-gray">New Password</label>
                    <Input
                      type="password"
                      className="border-outline"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    ></Input>
                  </div>
                )}

                {showPassword === false ? (
                  <Button
                    className="btn-lg btn-blue btn-block rounded-btn mt-4"
                    onClick={handleSend}
                  >
                    Send
                  </Button>
                ) : (
                  <Button
                    className="btn-lg btn-blue btn-block rounded-btn mt-4"
                    onClick={handleReset}
                  >
                    Reset Now
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
