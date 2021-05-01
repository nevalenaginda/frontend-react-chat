import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, Input } from "../component/base/index";
import { login } from "../configs/redux/action/user";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    const data = {
      email,
      password,
    };

    event.preventDefault();

    dispatch(login(data))
      .then((res) => {
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
            history.push("/chat");
          } else {
            history.push("/chat");
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      });
  };

  if (loading) {
    Swal.fire({
      icon: "info",
      title: "Loading!",
      text: "Please wait",
      showConfirmButton: false,
    });
  }

  return (
    <div className="bg-all overflow-auto">
      <div className="h-100vh container-md container-fluid">
        <div className="h-100 d-flex justify-content-center row no-gutters">
          <div className="col-md-5 align-self-center">
            <div className="card border-0 px-5 py-3 br-30px shadow">
              <h4 className="text-center text-blue my-3">Login</h4>
              <p className="font-weight-bold my-3 text-black">
                Hi, Welcome Back!
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="m-0 text-gray">Email</label>
                  <Input
                    type="email"
                    className="border-top-0 border-left-0 border-right-0 border-outline"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  ></Input>
                </div>
                <div className="form-group">
                  <label className="m-0 text-gray">Password</label>
                  <Input
                    type="password"
                    className="border-top-0 border-left-0 border-right-0 border-outline"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></Input>
                </div>
                <div className="text-right mb-3">
                  <a className="text-blue">
                    <Link to="/forgot-password"> Forgot password?</Link>
                  </a>
                </div>
                <Button
                  className="btn-lg btn-blue btn-block rounded-btn"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                <div className="row py-4">
                  <div className="col">
                    <hr />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <span className="align-self-center text-gray">
                      {" "}
                      Login With{" "}
                    </span>
                  </div>
                  <div className="col">
                    <hr />
                  </div>
                </div>
                <Button
                  className=" btn-lg btn-outline-blue btn-block rounded-btn text-blue"
                  onClick={handleSubmit}
                >
                  <i className="fab fa-google"></i> Google
                </Button>
                <div className="text-center py-3">
                  Don't have an account?
                  <a className="text-blue">
                    <Link to="/register"> Sign Up</Link>{" "}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
