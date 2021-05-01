import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChat, getListChat } from "../../configs/redux/action/socket";
import defaultUser from "../../assets/images/default-user.svg";

function RoomChat({ showRoomChat, queryRole, dataTarget }) {
  const dispatch = useDispatch();
  const bottomRef = useRef();

  const { socket, target, listChat } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const Url = process.env.REACT_APP_API_URL;

  const handleSendChat = (e) => {
    e.preventDefault();

    const data = {
      senderId: user.id,
      targetId: target.id,
      msg: message,
    };
    dispatch(sendChat(socket, data));
    setMessage("");
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [target.id, listChat]);

  return (
    <div
      className={`col overflow-auto h-100 ${
        queryRole === "friendProfile" ? "d-none d-lg-block" : ""
      }`}
    >
      {showRoomChat ? (
        <div>
          {/* <roomChat
          /> */}
          <div className="h-100vh">
            <div className="navBar shadow">
              <div className="d-flex h-100">
                <div className="align-self-center w-100">
                  <div className="container">
                    <div className="row">
                      <div className="d-lg-none col-1 d-flex">
                        <div className="align-self-center">
                          <h4 className="text-blue m-0 fas fa-chevron-left"></h4>
                        </div>
                      </div>
                      <div className="col d-flex">
                        <div className="mr-3">
                          {dataTarget.image ? (
                            <img
                              src={`${Url}/images/${dataTarget.image}`}
                              className="cover"
                            />
                          ) : (
                            <img src={defaultUser} className="cover" />
                          )}
                        </div>
                        <div>
                          <div className="text-dark text-decoration-none">
                            <span>
                              {dataTarget.name && (
                                <h4
                                  className="m-0 d-md-none text-truncate"
                                  style={{ maxWidth: "150px" }}
                                >
                                  {dataTarget.name}
                                </h4>
                              )}
                              {dataTarget.name && (
                                <h4 className="m-0 d-none d-md-block ">
                                  {dataTarget.name}
                                </h4>
                              )}

                              <p className="m-0">
                                <small className="text-blue">
                                  {dataTarget.socketId === null
                                    ? "Offline"
                                    : "Online"}
                                </small>
                              </p>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* dropdown */}
                      <div className="col-1 d-flex justify-content-end">
                        <div className="dropdown">
                          <button
                            className="btn noBorder-noSahdow"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <h4 className="m-0 text-blue text-right">
                              <i className="fas fa-ellipsis-v"></i>
                            </h4>
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-right rounded-dropdown bg-blue "
                            aria-labelledby="dropdownMenuButton"
                          >
                            <div className="py-2 dropdown-item text-white">
                              <i className="fas fa-phone"></i> &nbsp; Call
                            </div>
                            <div className="py-2 dropdown-item text-white">
                              <i className="fas fa-trash"></i>
                              &nbsp; Delete History
                            </div>
                            <div className="py-2 dropdown-item text-white">
                              <i className="fas fa-search"></i>
                              &nbsp; Mute Notifications
                            </div>
                            <div className="py-2 dropdown-item text-white">
                              <i className="fas fa-save"></i>
                              &nbsp; Search
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-light d-flex align-items-end">
              <div className="h-content overflow-auto container px-4 py-3">
                {listChat.map((item, index) => {
                  if (item.senderName !== user.name) {
                    return (
                      <span className="w-100 h-100" key={index}>
                        <div className="my-2 text-white bg-blue max-bubble receiveEnd">
                          <div className="container py-3">
                            {item.message}
                            <p className="m-0">
                              <small>
                                {new Date(item.created_at).toLocaleTimeString(
                                  "en-GB",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </small>
                            </p>
                          </div>
                        </div>
                      </span>
                    );
                  } else {
                    return (
                      <span className="w-100 h-100" key={index}>
                        <div className="w-100 d-flex justify-content-end">
                          <div className="my-2 bg-white max-bubble w-100 sendEnd">
                            <div className="container py-3 text-right">
                              {item.message}
                              <p className="m-0">
                                <small className="text-muted">
                                  {new Date(item.created_at).toLocaleTimeString(
                                    "en-GB",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                  <i className="fas fa-check-double"></i>
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </span>
                    );
                  }
                })}
                <div ref={bottomRef}></div>
              </div>
            </div>

            <div className="inputBar shadow">
              <form className="h-100" onSubmit={handleSendChat}>
                <div className="container d-flex h-100">
                  <div className="align-self-center w-100 px-4">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="form-control border-0 bg-light br-left-30px"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <div className="input-group-append">
                        <div className="dropup">
                          <button
                            className="btn btn-light noBorder-noSahdow"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <h5 className="m-0 text-blue text-right">
                              <i className="fas fa-plus text-blue"></i>
                            </h5>
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-right rounded-dropdown bg-blue "
                            aria-labelledby="dropdownMenuButton"
                          >
                            <div className="py-2 dropdown-item text-white">
                              <i className="far fa-image"></i> &nbsp; Images
                            </div>
                            <div className="py-2 dropdown-item text-white">
                              <i className="far fa-file"></i>
                              &nbsp; Documents
                            </div>
                            <div className="py-2 dropdown-item text-white">
                              <i className="far fa-user"></i>
                              &nbsp; Contacts
                            </div>
                            <div className="py-2 dropdown-item text-white">
                              <i className="fas fa-map-marker-alt"></i>
                              &nbsp; Location
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-light text-blue"
                          type="button"
                        >
                          <i className="fas fa-surprise"></i>
                        </button>
                        <button
                          className="btn btn-light text-blue br-right-30px"
                          type="button"
                        >
                          <i className="fas fa-dice-one"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <transition name="append">
                      <div className="align-self-center">
                        <button type="submit" className="btn btn-light">
                          <h3 className="m-0 text-blue">
                            <i className="fab fa-telegram-plane"></i>
                          </h3>
                        </button>
                      </div>
                    </transition> */}
                </div>
              </form>
            </div>
          </div>
          {/* dini akhir taruh room chatnya */}
        </div>
      ) : (
        <div className="h-100 d-flex justify-content-center">
          <div className="align-self-center">
            <h4 className="text-muted">
              Please select a chat to start messaging
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomChat;
