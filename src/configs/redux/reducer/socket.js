import io from "socket.io-client";
const initialState = {
  socket: io(process.env.REACT_APP_API_URL),
  userList: [],
  searchList: [],
  listChat: [],
  target: {
    id: 0,
    name: "",
    image: "default.png",
    socketId: "",
  },
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        ...state,
        userList: [],
        searchList: [],
        listChat: [],
        target: {
          id: 0,
          name: "",
          image: "default.png",
          socketId: "",
        },
      };
    case "GET_USER_LIST":
      return {
        ...state,
        userList: action.payload,
      };

    case "CHOOSE_TARGET":
      return {
        ...state,
        target: action.payload,
      };

    case "GET_LIST_CHAT":
      return {
        ...state,
        listChat: action.payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
