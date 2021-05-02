import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getProfile } from "../../configs/redux/action/user";
import defaultUser from "../../assets/images/default-user.svg";

function DetailProfile(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const Url = process.env.REACT_APP_API_URL;
  const { user, showRoomChatMobile } = useSelector((state) => state.user);
  const [displaySetting, setdisplaySetting] = useState(false);
  const [imgUrl, setImgUrl] = useState(`${Url}/images/default.png`);
  const [dataImage, setDataImage] = useState({ image: null });

  const [editUser, setEditUser] = useState(user);

  const handleEditProfile = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (event) => {
    if (event.target.files[0]) {
      const imgFiles = event.target.files[0];
      setImgUrl(URL.createObjectURL(event.target.files[0]));
      setDataImage({
        image: imgFiles,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", editUser.name);
    formData.append("phone", editUser.phone);
    formData.append("username", editUser.username);
    formData.append("bio", editUser.bio);
    if (dataImage.image !== null) {
      formData.append("image", dataImage.image);
    }

    dispatch(updateProfile(formData))
      .then((res) => {
        dispatch(getProfile());

        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  useEffect(() => {
    if (user.id) {
      setEditUser(user);
      setImgUrl(`${Url}/images/${user.image}`);
    }
  }, [user.id]);

  return (
    <div
      className={`h-100vh col-xl-3 col-md col-lg-4 border-right overflow-auto hideScroll`}
    >
      {/* setting profile */}
      <div className={`${displaySetting ? "d-none" : "d-block"}`}>
        <div className="container py-3">
          <div className="text-center text-blue pt-4">
            <h5 className="d-inline-block text-center text-main">
              {user.username}
            </h5>
            <div
              className="d-inline-block text-main float-left text-right h-100 pointer"
              onClick={(e) => history.push("/chat")}
            >
              <h5>
                <i className="fas fa-angle-left"></i>
              </h5>
            </div>
            <div
              className="d-inline-block text-main float-right h-100"
              onClick={(e) => setdisplaySetting(true)}
            >
              <i className="bi bi-pencil-fill"></i>
            </div>
          </div>
          {/* </div> */}
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
                {user.phone && <p className="m-0  mb-1 p-0 ">{user.phone}</p>}
              </div>
              <hr />
              <div className="pt-3">
                {user.username && (
                  <h5 className="font-weight-bold">{user.username}</h5>
                )}
                username
              </div>
              <hr />
              <div className="py-3">
                {user.bio && <h6 className="font-weight-bold">{user.bio}</h6>}
                Bio
              </div>

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

      <div
        className={`mt-4 h-100 px-md-5  ${displaySetting ? "" : "d-none"}`}
        style={{ height: "100vh" }}
      >
        <div className="card-body py-0 ">
          <div
            className="text-center pt-2 text-blue mb-3"
            style={{ height: "5vh" }}
          >
            <h5 className="d-inline-block text-center text-main">
              Edit Profile
            </h5>
            <p
              className="d-inline-block text-main float-left h-100"
              onClick={(e) => setdisplaySetting(false)}
            >
              <h5>
                <i className="fas fa-angle-left"></i>
              </h5>
            </p>
          </div>
          {/* <!-- Base Info --> */}
          <div className="text-center mb-4" style={{ height: "20vh" }}>
            {editUser.image && (
              <img
                src={imgUrl}
                style={{ width: "100px", height: "100px" }}
                className="cover my-4"
                alt="/"
              />
            )}
          </div>
          {/* <!-- Detail Info --> */}
          <div
            style={{ height: "75vh", overflowY: "scroll" }}
            className="hideScroll"
          >
            <form onSubmit={handleSubmit}>
              <p className="font-weight-bold mb-1">Account</p>
              <input
                type="file"
                className="form-control w-100 p-1"
                onChange={handleChangeImage}
              />
              <small>Profile Picture</small>
              <hr />
              <input
                type="text"
                name="username"
                value={editUser.username}
                onChange={(e) => handleEditProfile(e)}
                className=" form-control w-100"
              />
              <small>Username</small>
              <hr />
              <input
                type="text"
                className=" form-control w-100"
                name="name"
                value={editUser.name}
                onChange={(e) => handleEditProfile(e)}
              />
              <small>Full Name</small>
              <hr />
              <input
                type="email"
                className=" form-control w-100"
                name="email"
                value={editUser.email}
                disabled
              />
              <small>Email</small>
              <hr />
              <input
                type="text"
                className="p form-control w-100"
                name="phone"
                value={editUser.phone}
                onChange={(e) => handleEditProfile(e)}
              />
              <small>Handphone</small>
              <hr />
              <textarea
                type="text"
                className=" form-control text-justify w-100"
                name="bio"
                value={editUser.bio}
                onChange={(e) => handleEditProfile(e)}
              />
              <small>Bio</small>
              <hr />

              <button
                className="btn btn-blue w-100 mb-4 br-30px"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProfile;
