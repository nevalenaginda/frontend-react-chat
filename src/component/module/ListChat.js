import React, { useEffect, useState } from "react";
import defaultUser from "../../assets/images/default-user.svg";
import { useDispatch, useSelector } from "react-redux";
import { getListChat } from "../../configs/redux/action/socket";

function ListChat({ onClick, dataTarget, lastChat }) {
  const dispatch = useDispatch();
  const { socket, target, listChat } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  // const [lastChat, setLastChat] = useState([]);

  const Url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const data = {
      senderId: user.id,
      targetId: target.id,
      roomId: user.roomId,
    };
    dispatch(getListChat(socket, data));
  }, [dispatch, target.id]);

  // useEffect(() => {
  //   if (user.id & dataTarget.id) {
  //     const data = {
  //       senderId: user.id,
  //       targetId: dataTarget.id,
  //       roomId: user.roomId,
  //     };

  //     socket.emit("get-last-chat", data);
  //     socket.on("res-get-last-chat", (response) => {
  //       setLastChat(response);
  //       console.log("response last chat", response);
  //     });
  //   }
  // }, [dataTarget.id]);

  return (
    <div className="container py-2 pointer list-chat" onClick={onClick}>
      <div className="text-decoration-none text-dark">
        <div className="row">
          <div className="col-3 d-flex justify-content-center">
            {dataTarget.image ? (
              <div className="align-self-center">
                <img
                  className="cover"
                  src={`${Url}/images/${dataTarget.image}`}
                />
              </div>
            ) : (
              <div className="align-self-center">
                <img className="cover" src={defaultUser} />
              </div>
            )}
          </div>
          <div className="col">
            <div className="align-self-center">
              <div className="d-flex justify-content-between">
                {dataTarget.name && (
                  <h5
                    className="m-0 font-weight-bold text-truncate"
                    style={{ maxWidth: "160px" }}
                  >
                    {dataTarget.name}
                  </h5>
                )}
                {/* <p className="pl-3 m-0 text-muted">
                  <small>16:13</small>
                </p> */}
              </div>
              {/* {lastChat && (
                <div className="d-flex justify-content-between">
                  {lastChat.message}
                  <div className="align-self-center">
                    <span className="badge badge-pill btn-blue d-flex">1</span>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListChat;
