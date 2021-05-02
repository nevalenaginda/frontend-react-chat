import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChat, getListChat } from "../../configs/redux/action/socket";
import Swal from "sweetalert2";
import defaultUser from "../../assets/images/default-user.svg";

function RoomChat({ showRoomChat, queryRole }) {
  const dispatch = useDispatch();
  const bottomRef = useRef();

  const { socket, target, listChat } = useSelector((state) => state.socket);
  const { user, showRoomChatMobile, showFriendsProfile } = useSelector(
    (state) => state.user
  );
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

  const handleDeleteChat = (e, item) => {
    e.preventDefault();
    const data = {
      senderId: user.id,
      targetId: target.id,
      msg: item.message,
      id: item.id,
    };
    Swal.fire({
      title: "Delete Chat",
      text: "Area you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7E98DF",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        socket.emit("delete-chat", data);
        socket.on("res-delete-chat", (response) => {
          Swal.fire({
            icon: "success",
            title: response,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
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
        showRoomChatMobile ? "" : "d-none  d-lg-block"
      } ${showFriendsProfile ? "d-none d-lg-block" : ""}`}
    >
      {showRoomChat && target.id !== 0 ? (
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
                        <div
                          className="align-self-center pointer"
                          onClick={(e) =>
                            dispatch({ type: "CLOSE_ROOMCHAT_MOBILE" })
                          }
                        >
                          <h4 className="text-blue m-0 fas fa-chevron-left"></h4>
                        </div>
                      </div>
                      <div className="col d-flex">
                        <div className="mr-3">
                          {target.image ? (
                            <img
                              src={`${Url}/images/${target.image}`}
                              className="cover"
                              alt="/"
                            />
                          ) : (
                            <img src={defaultUser} className="cover" />
                          )}
                        </div>
                        <div
                          className="pointer"
                          onClick={(e) =>
                            dispatch({ type: "SHOW_FRIENDS_PROFILE" })
                          }
                        >
                          <div className="text-dark text-decoration-none">
                            <span>
                              {target.name && (
                                <h4
                                  className="m-0 d-md-none text-truncate"
                                  style={{ maxWidth: "150px" }}
                                >
                                  {target.name}
                                </h4>
                              )}
                              {target.name && (
                                <h4 className="m-0 d-none d-md-block ">
                                  {target.name}
                                </h4>
                              )}

                              <p className="m-0">
                                <small className="text-blue">
                                  {target.socketId === null
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
              <div className="h-content overflow-auto container px-4 py-3 hideScroll">
                {listChat.map((item, index) => {
                  if (item.senderName !== user.name) {
                    return (
                      <span className="w-100 h-100" key={index}>
                        <div className="w-100 d-flex justify-content-start">
                          <div className="d-flex align-items-center mr-2">
                            <img
                              className="cover-img-chat"
                              src={`${Url}/images/${target.image}`}
                              alt="profile"
                            />
                          </div>

                          <div
                            className="my-2 text-white bg-blue max-bubble receiveEnd pointer"
                            onClick={(e) => handleDeleteChat(e, item)}
                          >
                            <div className="container py-3 text-right">
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
                        </div>
                      </span>
                    );
                  } else {
                    return (
                      <span className="w-100 h-100" key={index}>
                        <div className="w-100 d-flex justify-content-end">
                          <div
                            className="my-2 bg-white max-bubble sendEnd pointer"
                            onClick={(e) => handleDeleteChat(e, item)}
                          >
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
                          <div className="d-flex align-items-center ml-2">
                            <img
                              className="cover-img-chat"
                              src={`${Url}/images/${user.image}`}
                              alt="profile"
                            />
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
        <div className="h-100 d-flex justify-content-center d-md-none d-lg-flex">
          <div className="align-self-center">
            <h4 className="text-muted text-center">
              Please select a chat to start messaging
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomChat;
