import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultUser from "../../assets/images/default-user.svg";

function DetailProfile(props) {
  const history = useHistory();
  const Url = process.env.REACT_APP_API_URL;
  const [disabledName, setDisabledName] = useState(true);
  const [disabledPhone, setDisabledPhone] = useState(true);

  const { user } = useSelector((state) => state.user);

  const handleChangeName = () => {
    setDisabledName(false);
  };

  const handleApplyName = () => {
    setDisabledName(true);
  };

  const handleChangePhone = () => {
    setDisabledPhone(false);
  };

  const handleApplyPhone = () => {
    setDisabledPhone(true);
  };

  return (
    <div
      className={`h-100vh col-md-3 border-right overflow-auto ${
        props.queryRole === "setting" ? "d-none d-lg-block" : ""
      }`}
    >
      {/* setting profile */}
      <div>
        <div className="container py-3">
          <div className="row d-flex">
            <div className="col-1 align-self-center">
              <div className="pointer" onClick={(e) => history.push("/chat")}>
                <h4 className="m-0 text-blue">
                  <i className="fas fa-chevron-left"></i>
                </h4>
              </div>
            </div>
            <div className="col text-center">
              {user.username && (
                <h4 className="text-blue m-0">{user.username}</h4>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="container pt-4">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <span className="align-self-center">
                    <input
                      type="file"
                      id="setPhoto"
                      style={{ display: "none" }}
                    />
                    <div>
                      {user.image ? (
                        <img
                          style={{ height: "100px", width: "100px" }}
                          className="cover"
                          src={`${Url}/images/${user.image}`}
                        />
                      ) : (
                        <img
                          style={{ height: "100px", width: "100px" }}
                          className="cover"
                          src={defaultUser}
                        />
                      )}
                    </div>
                  </span>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="pt-3 align-self-center">
                    {user.name && <h4 className="text-center">{user.name}</h4>}
                    {user.username && (
                      <p className="text-muted text-md-center">
                        {user.username}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div className="pt-1">
                <h5 className="font-weight-bold">Account</h5>
                {user.phone && (
                  <input
                    className="m-0  mb-1 form-control p-0 input-setting"
                    value={user.phone}
                    disabled={disabledPhone}
                  />
                )}

                <div
                  className={`text-decoration-none text-blue pointer ${
                    disabledPhone ? "" : "d-none"
                  }`}
                  onClick={handleChangePhone}
                >
                  Tap to change phone number
                </div>
                <div
                  className={`text-decoration-none text-blue pointer ${
                    disabledPhone ? "d-none" : ""
                  }`}
                  onClick={handleApplyPhone}
                >
                  Apply
                </div>
              </div>
              <hr />
              <div className="pt-3">
                <h5 className="font-weight-bold">Username</h5>
                {user.username && (
                  <input
                    className="m-0 mb-1 form-control p-0 input-setting"
                    value={user.username}
                    disabled={disabledName}
                  />
                )}

                <div
                  className={`text-decoration-none text-blue pointer ${
                    disabledName ? "" : "d-none"
                  }`}
                  onClick={handleChangeName}
                >
                  Tap to change username
                </div>
                <div
                  className={`text-decoration-none text-blue pointer ${
                    disabledName ? "d-none" : ""
                  }`}
                  onClick={handleApplyName}
                >
                  Apply
                </div>
              </div>
              <hr />
              <div className="py-3">
                {user.bio && <h6 className="font-weight-bold">{user.bio}</h6>}
                Bio
              </div>
              {/* <div>
              Location
              <Maps
                v-if="render"
                :lat="userData.lat_user"
                :long="userData.long_user"
              />
              <div>
                <div className="w-100">
                  <form @submit.prevent="setLocation()">
                    <div className="mb-3">
                      <input
                        className="form-control mt-2 w-100"
                        placeholder="Latitude"
                        v-model="userData.lat_user"
                        type="text"
                      />
                      <input
                        className="form-control mt-2 w-100"
                        placeholder="Longitude"
                        v-model="userData.long_user"
                        type="text"
                      />
                    </div>
                    <div className="w-100 text-right">
                      <button className="btn btn-success">
                        Set Location
                      </button>
                    </div>
                  </form>
                </div>
              </div> */}
              {/* </div> */}
              <div className="pt-3">
                <h5 className="font-weight-bold">Settings</h5>
                <div className="d-flex justify-content-between py-2">
                  <div className="d-flex">
                    <h6 className="far fa-bell text-blue mr-4"></h6>
                    <h6 className="text-blue">Notifications and Sounds</h6>
                  </div>
                  <h6 className="fas fa-chevron-right text-blue"></h6>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <h6 className="fas fa-lock text-blue mr-4"></h6>
                    <h6 className="text-blue">Privacy and Security</h6>
                  </div>
                  <h6 className="fas fa-chevron-right text-blue"></h6>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <div className="d-flex">
                    <h6 className="fas fa-chart-line text-blue mr-4"></h6>
                    <h6 className="text-blue">Data and Storage</h6>
                  </div>
                  <h6 className="fas fa-chevron-right text-blue"></h6>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <h6 className="far fa-comment-dots text-blue mr-4"></h6>
                    <h6 className="text-blue">Chat settings</h6>
                  </div>
                  <h6 className="fas fa-chevron-right text-blue"></h6>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <div className="d-flex">
                    <h6 className="fas fa-laptop text-blue mr-4"></h6>
                    <h6 className="text-blue">Devices</h6>
                  </div>
                  <h6 className="fas fa-chevron-right text-blue"></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dibawah akhir setting profile */}
    </div>
  );
}

export default DetailProfile;
