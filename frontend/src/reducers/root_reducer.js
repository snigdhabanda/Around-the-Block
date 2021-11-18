import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
// import entitiesReducer from "./entities_reducer";
import errorsReducer from "./errors_reducer";
import EventsReducer from "./event_reducer";
import users from "./users_reducer";

const RootReducer = combineReducers({
  // entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  events: EventsReducer,
  users,
});

export default RootReducer;
