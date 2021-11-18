import { connect } from 'react-redux';
import { fetchEvents, fetchEvent } from '../../actions/event_actions';
import { receiveInvites } from '../../actions/friend_invites_actions';
import { fetchFriendRequests } from '../../actions/friend_request_actions';
import { fetchUsers } from '../../actions/users_actions';
import MainPage from './main_page';

const mapStateToProps = (state) => {
    // console.log(state)
  
    return {events: Object.values(state.events)}
    
};

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    receiveInvites: () => dispatch(receiveInvites()),
    fetchFriendRequests: () => dispatch(fetchFriendRequests()),
    fetchUsers: () => dispatch(fetchUsers())
    // fetchEvent: (eventId) => dispatch(fetchEvent(eventId))

});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);