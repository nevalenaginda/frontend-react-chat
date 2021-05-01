export const getAllUser = (socket, data) => (dispatch) => {
  socket.emit("search-name", data);
  socket.on("res-search-name", (response) => {
    // console.log("ini daftar user", response);
    dispatch({ type: "GET_USER_LIST", payload: response });
  });
};

export const sendChat = (socket, data) => (dispatch) => {
  socket.emit("send-message", data);
  socket.on("res-get-list-chat", (response) => {
    dispatch({ type: "GET_LIST_CHAT", payload: response });
  });
  socket.on("res-target-data", (response) => {
    console.log("ini response data targetnya", response);
  });
};

export const getListChat = (socket, data) => (dispatch) => {
  socket.emit("get-list-chat", {
    senderId: data.senderId,
    targetId: data.targetId,
    roomId: data.roomId,
  });
  socket.on("res-get-list-chat", (response) => {
    dispatch({ type: "GET_LIST_CHAT", payload: response });
  });
};
