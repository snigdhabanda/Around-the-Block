import { connect } from "react-redux";
import {
  fetchCurrentUser,
  updateCurrentUser,
} from "../../actions/users_actions";
import { fetchEvents, updateEvent } from "../../actions/event_actions";
import {
  receiveInvites,
  updateFriend,
} from "../../actions/friend_invites_actions";
import {
  fetchFriendRequests,
  createFriendRequest,
} from "../../actions/friend_request_actions";
import { fetchUsers } from "../../actions/users_actions";

import FutureEvent from "./future_event";

const mapStateToProps = (state) => ({
  currentUser: state.session,
  events: Object.values(state.events),
  users: state.users,
  invites: state.invites,
  preJoinedEvent: state.ui.preJoinedEvent,
  requests: state.requests,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchEvents: () => dispatch(fetchEvents()),
  receiveInvites: () => dispatch(receiveInvites()),
  fetchFriendRequests: () => dispatch(fetchFriendRequests()),
  createFriendRequest: (friendId) => dispatch(createFriendRequest(friendId)),
  updateFriend: (request) => dispatch(updateFriend(request)),
  fetchUsers: () => dispatch(fetchUsers()),
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
  updateEvent: (event) => dispatch(updateEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureEvent);
