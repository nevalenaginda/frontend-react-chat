const initialState = {
  user: {},
  loading: false,
  error: "",
  showFriendsProfile: false,
  showRoomChatMobile: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SHOW_FRIENDS_PROFILE":
      return {
        ...state,
        showFriendsProfile: true,
      };

    case "CLOSE_FRIENDS_PROFILE":
      return {
        ...state,
        showFriendsProfile: false,
      };

    case "SHOW_ROOMCHAT_MOBILE":
      return {
        ...state,
        showRoomChatMobile: true,
      };

    case "CLOSE_ROOMCHAT_MOBILE":
      return {
        ...state,
        showRoomChatMobile: false,
      };

    case "USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        loading: false,
        user: {},
      };

    case "GET_PROFILE":
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
