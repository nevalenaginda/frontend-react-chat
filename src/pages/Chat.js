import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ListChat,
  DetailProfile,
  RoomChat,
  ProfileFriends,
} from "../component/module";

import { getListMessages } from "../configs/redux/action/socket";
import {
  logout,
  getAllUser,
  searchUsers,
  getDetailFriends,
} from "../configs/redux/action/user";

toast.configure();

function Chat() {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { allUser } = useSelector((state) => state.friends);
  const { user, showRoomChatMobile } = useSelector((state) => state.user);
  const [searchUserData, setSearchUser] = useState(null);
  const [idReceiver, setIdReceiver] = useState(null);

  const [showRoomChat, setShowRoomChat] = useState(false);
  let queryRole = query.get("role");

  const goSetting = (e) => {
    history.push("/chat?role=setting");
  };

  const handleLogout = (e) => {
    Swal.fire({
      title: "Logout",
      text: "Area you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7E98DF",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        dispatch(logout(socket, history));
        dispatch({ type: "LOGOUT" });
        dispatch({ type: "EMPTYCHAT" });
        dispatch({ type: "EMPTY_FRIENDS" });
      }
    });
  };

  const handleClickListChat = (data) => {
    setShowRoomChat(true);
    localStorage.setItem("idTarget", data);
    setIdReceiver(data);
    dispatch({ type: "GET_LIST_CHAT", payload: [] });
    dispatch(getListMessages(data));
    dispatch({ type: "SHOW_ROOMCHAT_MOBILE" });
  };

  useEffect(() => {
    if (socket && user.id) {
      socket.emit("connected", user);
      socket.emit("join-room", user.roomId);
      localStorage.setItem("idTarget", 0);
    }
  }, [socket, user, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("receiverMessage", (data) => {
        dispatch({ type: "GET_LIST_MESSAGES", payload: data });
        const lastmessage = data[data.length - 1];
        dispatch({ type: "GET_LAST_MESSAGES", payload: lastmessage });
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (searchUserData) {
      dispatch(searchUsers(searchUserData));
    }
  }, [dispatch, searchUserData]);

  useEffect(() => {
    if (idReceiver) {
      dispatch(getAllUser());
      dispatch(getDetailFriends(idReceiver));
    }
  }, [dispatch, idReceiver]);

  useEffect(() => {
    if (socket) {
      const idTarget = localStorage.getItem("idTarget");
      socket.off("res-new-chat");

      socket.on("res-new-chat", (response) => {
        if (response.fromId !== Number(idTarget)) {
          console.log(response.fromId, "=", idTarget);
          const notify = () => {
            toast(`${response.from}: ${response.message}`, {
              position: "top-right",
              autoClose: 3000,

              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          };
          notify();
        }
      });
    }
  }, [socket, idReceiver]);

  return (
    <div className="h-100vh">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        newestOnTop
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="h-100">
        <div className="row no-gutters h-100 justify-content-end">
          {/* start condition from here */}
          {queryRole === "setting" ? (
            <DetailProfile queryRole={queryRole} />
          ) : (
            <div
              className={`col-xl-3 col-md col-lg-4 border-right ${
                showRoomChatMobile ? "d-none d-lg-block" : ""
              }`}
            >
              <div className="container py-3 h-200px">
                <div className="row no-gutters">
                  <div className="col">
                    <h3 className="text-blue">Telegram</h3>
                  </div>
                  <div className="col-2 d-flex justify-content-end">
                    <div className="dropdown">
                      <button
                        className="btn noBorder-noSahdow"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <h3 className="m-0 text-blue text-right">
                          <i className="fas fa-stream"></i>
                        </h3>
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-right rounded-dropdown bg-blue "
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div
                          className="py-2 dropdown-item text-white pointer"
                          onClick={(e) => goSetting(e)}
                        >
                          <i className="fas fa-cog"></i> &nbsp; Settings
                        </div>
                        <div className="py-2 dropdown-item text-white">
                          <i className="far fa-user"></i>
                          &nbsp; Contacts
                        </div>
                        <div className="py-2 dropdown-item text-white">
                          <i className="fas fa-phone"></i>
                          &nbsp; Calls
                        </div>
                        <div className="py-2 dropdown-item text-white">
                          <i className="fas fa-save"></i>
                          &nbsp; Save Messages
                        </div>
                        <div className="py-2 dropdown-item text-white">
                          <i className="fas fa-user-plus"></i>
                          &nbsp; Invite Friends
                        </div>
                        <div className="py-2 dropdown-item text-white">
                          <i className="far fa-question-circle"></i>
                          &nbsp; Telegram FAQ
                        </div>
                        <div
                          className="py-2 dropdown-item text-white pointer"
                          onClick={handleLogout}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          &nbsp;Logout
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters pt-4">
                  <div className="col d-flex">
                    <span className="align-self-center w-100">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text bg-light border-0"
                            id="basic-addon2"
                          >
                            <i className="fas fa-search"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          placeholder="Search"
                          onKeyUp={(e) => setSearchUser(e.target.value)}
                        />
                      </div>
                    </span>
                  </div>
                  <div className="col-2 d-flex justify-content-end">
                    <span className="align-self-center">
                      <div>
                        <h3 className="text-blue">
                          <i className="fas fa-plus"></i>
                        </h3>
                      </div>
                    </span>
                  </div>
                </div>
                <div>
                  <div className="row no-gutters pt-3">
                    <div className="col">
                      <button className="btn btn-block btn-blue br-30px">
                        All
                      </button>
                    </div>
                    <div className="col ">
                      <button className="btn btn-block br-30px">
                        Important
                      </button>
                    </div>
                    <div className="col">
                      <button className="btn btn-block br-30px">Unread</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-auto h-remaining-header w-100">
                {allUser.length > 0 ? (
                  allUser.map((data, index) => {
                    return (
                      <span key={index}>
                        <div className="div-untuk-perulangan">
                          <ListChat
                            dataTarget={data}
                            // lastChat={dataLastChat[index]}
                            onClick={(e) => handleClickListChat(data.id)}
                          />
                        </div>
                      </span>
                    );
                  })
                ) : (
                  <div className="d-flex h-remaining-header justify-content-center">
                    <div className="align-self-center">
                      <div className="align-self-center">
                        <div className="text-decoration-none">
                          <h3 className="text-blue text-center">
                            User not found
                          </h3>
                          <p className="text-muted text-center">
                            Start chat with other contact
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <RoomChat showRoomChat={showRoomChat} queryRole={queryRole} />
          <ProfileFriends />
        </div>
      </div>
    </div>
  );
}

export default Chat;
