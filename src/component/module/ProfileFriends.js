import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function ProfileFriends() {
  const dispatch = useDispatch();
  const { dataReceiver: target } = useSelector((state) => state.friends);
  const { showFriendsProfile } = useSelector((state) => state.user);
  const [clickedType, setClickedType] = useState("image");
  const [chatDataType, setDataType] = useState([
    { text: "Location", value: "location" },
    { text: "Image", value: "image" },
    { text: "Documents", value: "document" },
  ]);
  const [dummyFile, setDummyFile] = useState([
    { type: "success", text: "ExcelTugas.xlsx", icon: "far fa-file-excel" },
    { type: "danger", text: "Kontrak.pdf", icon: "far fa-file-pdf" },
    { type: "info", text: "Skripsi.docx", icon: "far fa-file-word" },
    { type: "warning", text: "PPTTugas.pptx", icon: "far fa-file-powerpoint" },
    { type: "danger", text: "Kontrak.pdf", icon: "far fa-file-pdf" },
    { type: "warning", text: "PPTTugas.pptx", icon: "far fa-file-powerpoint" },
  ]);
  const dummyImage = 15;
  const Url = process.env.REACT_APP_API_URL;

  return (
    <div
      className={`px-0 px-md-5 col col-md-12 col-lg-4 h-100 border  ${
        showFriendsProfile ? "d-lg-block" : "d-none"
      }`}
      style={{ height: "100vh" }}
    >
      {/* v-if="friendsData.username !== undefined" */}
      {target ? (
        <div className="card-body py-0">
          <div className="text-center pt-4 text-blue" style={{ height: "5vh" }}>
            <h4 className="d-inline-block text-center text-main">
              {target.username}
            </h4>
            <h4
              className="d-inline-block text-main float-left text-right h-100 pointer"
              onClick={(e) => dispatch({ type: "CLOSE_FRIENDS_PROFILE" })}
            >
              <i className="fas fa-angle-left"></i>
            </h4>
          </div>

          <div className="text-center mt-5">
            <img
              src={`${Url}/images/${target.image}`}
              className="img cover-img-chat"
              alt="profile"
            />
            <br />
            <div id="friendship" className="text-left">
              <h5 className="text-left font-weight-bold mt-3 d-inline-block">
                {target.name}{" "}
              </h5>
            </div>
            {target.socketId !== null ? (
              <p className="text-left text-blue">Online</p>
            ) : (
              <p className="text-left text-blue">Offline</p>
            )}

            <p className="text-left font-weight-bold mb-0">Phone number</p>
            <p className="text-left text-blue">{target.phone}</p>
          </div>
          <div style={{ height: "8vh" }}>
            <div className="btn-group btn-group-toggle w-100">
              {chatDataType.map((item, index) => {
                return (
                  <label
                    key={index}
                    className="btn btn-sm btn-blue font-weight-bolder mx-1"
                    style={{ borderRadius: "25px" }}
                  >
                    <input
                      onClick={(e) => setClickedType(item.value)}
                      type="radio"
                    />{" "}
                    {item.text}
                  </label>
                );
              })}
            </div>
          </div>

          <div
            style={{ height: "40vh", overflowY: "scroll" }}
            className="hideScroll "
          >
            {clickedType === "location" ? (
              <div className="row">
                {" "}
                <div className="text-center mt-5 pt-5 h-100 w-100 d-flex-column justify-content-center">
                  <img src="https://img.icons8.com/cute-clipart/64/000000/sad.png" />
                  <h5 className="text-secondary">This feature is upcoming</h5>
                </div>
              </div>
            ) : clickedType === "image" ? (
              <div>
                <div className="row text-center w-100">
                  {Array(dummyImage)
                    .fill()
                    .map((item, index) => {
                      return (
                        <div key={index} className="col-md-4 col-lg-4 col-4">
                          <img
                            src={`${Url}/images/sampleImg_${index}.png`}
                            className="img-fluid  mx-1 my-1"
                            alt="/"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div>
                {dummyFile.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={`alert alert-${item.type}`} role="alert">
                        <i className={`${item.icon}`}></i> {item.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card-body py-auto">
          <div className="text-center pt-4" style={{ height: "5vh" }}>
            <h5 className="d-inline-block text-center text-main">
              Back to List User
            </h5>
            <div className="d-inline-block text-main float-left text-right h-100">
              <i className="fas fa-angle-left"></i>
            </div>
            <br />
            <div className="text-center mt-5 pt-5 h-100 d-flex-column justify-content-center">
              <img src="https://img.icons8.com/cute-clipart/64/000000/sad.png" />
              <h3 className="text-secondary">Please re-select Your Friends</h3>
            </div>
          </div>
        </div>
      )}

      {/* v-else */}
    </div>
  );
}

export default ProfileFriends;
