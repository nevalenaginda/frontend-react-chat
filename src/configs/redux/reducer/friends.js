const initialState = {
  allUser: [],
  searchList: [],
  listMessages: [],
  lastMessage: null,
  dataReceiver: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPTY_FRIENDS":
      return {
        ...state,
        allUser: [],
        searchList: [],
        listChat: [],
        target: null,
      };
    case "GET_ALL_USER":
      return {
        ...state,
        allUser: action.payload,
      };

    case "SEARCH_USER":
      return {
        ...state,
        allUser: action.payload,
      };

    case "GET_DETAIL_RECEIVER":
      return {
        ...state,
        dataReceiver: action.payload,
      };

    case "GET_LIST_MESSAGES":
      return {
        ...state,
        listMessages: action.payload,
      };
    case "GET_LAST_MESSAGES":
      return {
        ...state,
        lastMessage: action.payload,
      };
    default:
      return state;
  }
};

export default friendReducer;
