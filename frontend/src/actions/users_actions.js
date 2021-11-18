import * as Session from "./session_actions";
import * as UserAPIUtil from "../util/user_api_util";
import * as SessionAPIUtil from "../util/session_api_util";

export const RECEIVE_USER_ERROR = "RECEIVE_USER_ERROR";
export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERROR,
  errors,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const fetchCurrentUser = () => (dispatch) =>
  UserAPIUtil.fetchCurrentUser().then(
    (user) => dispatch(Session.receiveCurrentUser(user.data)),
    (err) => dispatch(receiveUserErrors(err.response.data))
  );

export const updateCurrentUser = (userData) => (dispatch) =>
  UserAPIUtil.updateCurrentUser(userData).then(
    (user) => dispatch(Session.receiveCurrentUser(user.data)),
    (err) => dispatch(receiveUserErrors(err.response.data))
  );

export const fetchUsers = () => dispatch => (
    SessionAPIUtil.fetchUsers().then(
        (users) => dispatch(receiveUsers(users.data))
    )
)
