import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import users from "./users_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  users,
});
