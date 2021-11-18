import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
// import {
//   fetchFriendRequests,
//   createFriendRequest,
// } from "../../actions/friend_request_actions";
// import { fetchCurrentUser } from "../../actions/users_actions";
// import { fetchEvents } from "../../actions/event_actions";
// import {
//   receiveInvites,
//   updateFriend,
// } from "../../actions/friend_invites_actions";
// import { fetchUsers } from "../../actions/users_actions";

import NavBar from "./nav_bar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  // users: state.users,
  // invites: state.invites,
  // currentUser: state.session,
  events: Object.values(state.events),
});

const mapDispatchToProps = () => (dispatch) => ({
  logout: () => dispatch(logout()),
  // fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  // fetchEvents: () => dispatch(fetchEvents()),
  // receiveInvites: () => dispatch(receiveInvites()),
  // fetchFriendRequests: () => dispatch(fetchFriendRequests()),
  // createFriendRequest: (friendId) => dispatch(createFriendRequest(friendId)),
  // updateFriend: (request) => dispatch(updateFriend(request)),
  // fetchUsers: () => dispatch(fetchUsers()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
