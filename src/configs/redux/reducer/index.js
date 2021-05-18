import { combineReducers } from "redux";
import userReducer from "./user";
import socketReducer from "./socket";
import friendReducer from "./friends";

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  friends: friendReducer,
});

export default rootReducer;
