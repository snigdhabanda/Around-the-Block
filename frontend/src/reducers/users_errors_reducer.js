import { RECEIVE_USER_ERROR } from "../actions/users_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const _nullErrors = [];
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERROR:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    default:
      return state;
  }
};
