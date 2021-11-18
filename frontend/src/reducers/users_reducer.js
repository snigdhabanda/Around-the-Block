import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USERS} from '../actions/users_actions';


const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.currentUser.id] = action.currentUser;
      return newState;
    case RECEIVE_USERS:
        return action.users;
    default:
      return state;
  }
};

export default UsersReducer;
