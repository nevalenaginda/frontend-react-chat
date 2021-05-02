import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ListChat,
  DetailProfile,
  RoomChat,
  ProfileFriends,
} from "../component/module";
import { logout } from "../configs/redux/action/user";
import { getAllUser } from "../configs/redux/action/socket";

function Chat() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const { socket, userList, target } = useSelector((state) => state.socket);
  const { user, showRoomChatMobile } = useSelector((state) => state.user);

  const [showRoomChat, setShowRoomChat] = useState(false);
  let queryRole = query.get("role");
  // let { chatId } = useParams();
  let chatId = query.get("chatId");
  // console.log(chatId);

  const goSetting = (e) => {
    history.push("/chat?role=setting");
  };

  const handleLogout = (e) => {
    dispatch(logout(socket, history));
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "EMPTYCHAT" });
  };

  const handleClickListChat = (index) => {
    setShowRoomChat(true);
    dispatch({ type: "CHOOSE_TARGET", payload: userList[index] });
    dispatch({ type: "SHOW_ROOMCHAT_MOBILE" });
  };

  useEffect(() => {
    if (socket && user.id) {
      socket.emit("connected", user);
      socket.emit("join-room", user.roomId);
      // const data = {
      //   id: user.id,
      //   searchName: "",
      //   roomId: user.roomId,
      // };
      // dispatch(getAllUser(socket, data));
    }
  }, [socket, user, dispatch]);

  useEffect(() => {
    if (socket && user.id && userList) {
      const data = {
        id: user.id,
        searchName: "",
        roomId: user.roomId,
      };
      dispatch(getAllUser(socket, data));
    }
  }, [socket, user, target.id, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("res-new-chat", (response) => {
        Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        }).fire({
          icon: "info",
          title: `${response.from}: ${response.message}`,
        });
      });
    }
  }, [socket]);

  return (
    <div className="h-100vh">
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
                {userList.length > 0 ? (
                  userList.map((data, index) => {
                    return (
                      <span key={index}>
                        <div className="div-untuk-perulangan">
                          <ListChat
                            dataTarget={data}
                            onClick={(e) => handleClickListChat(index)}
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
                          <h3 className="text-blue">Feel lonely?</h3>
                          <p className="text-muted">
                            Start chat with your contact
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
