import { connect } from "react-redux";
import { fetchEvents } from "../../actions/event_actions";
import { receiveInvites, updateFriend } from "../../actions/friend_invites_actions";
import { fetchFriendRequests } from "../../actions/friend_request_actions";
import { createFriendRequest } from "../../actions/friend_request_actions";
import { fetchUsers } from "../../actions/users_actions";


import UserProfile from "./user_profile";

const mapStateToProps = (state) => ({

  events: Object.values(state.events),
  currentUser: state.session,
  users: state.users,
  invites: state.invites,
  // event: state.entities.events[ownProps.match.params.eventId]
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  receiveInvites: () => dispatch(receiveInvites()),
  fetchFriendRequests: () => dispatch(fetchFriendRequests()),
  createFriendRequest: (friendId) => dispatch(createFriendRequest(friendId)),
  updateFriend: (request) => dispatch(updateFriend(request)),
  fetchUsers: () => dispatch(fetchUsers())

  // fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
