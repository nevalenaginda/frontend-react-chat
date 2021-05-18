import React from "react";
import defaultUser from "../../assets/images/default-user.svg";
import { useSelector } from "react-redux";

function ListChat({ onClick, dataTarget, lastChat }) {
  const { lastMessage } = useSelector((state) => state.friends);

  const Url = process.env.REACT_APP_API_URL;

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
                <p className="pl-3 m-0 text-muted">
                  {lastMessage && (
                    <small>
                      {dataTarget.id === lastMessage.targetId
                        ? lastMessage.time
                        : ""}
                    </small>
                  )}{" "}
                </p>
              </div>

              {lastMessage && (
                <div className="d-flex justify-content-between">
                  {dataTarget.id === lastMessage.targetId
                    ? lastMessage.message
                    : ""}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListChat;
