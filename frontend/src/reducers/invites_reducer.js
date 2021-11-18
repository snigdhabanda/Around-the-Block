import { RECEIVE_INVITES, UPDATE_FRIEND} from '../actions/friend_invites_actions';

const FriendInviteReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
      case RECEIVE_INVITES:
          return action.invites
      case UPDATE_FRIEND:
            return nextState[action.record._id] = action.record
        default:
        return state;
    }
  };
  
  export default FriendInviteReducer;