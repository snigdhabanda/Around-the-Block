import * as FriendRequestAPIUtil from "../util/friend_request_util";
import {receiveFriendErrors} from './friend_request_actions'
export const RECEIVE_INVITES = "RECEIVE_INVITES";
export const UPDATE_FRIEND = "UPDATE_FRIEND";



const getInvites = (invites) => ({
    type: RECEIVE_INVITES,
    invites
})

export const receiveInvites = () => dispatch => (
    FriendRequestAPIUtil.receiveInvites().then(
        (invites) => dispatch(getInvites(invites.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)

const updateAFriend = (record) => ({
    type: UPDATE_FRIEND,
    record
})

export const updateFriend = (request) => dispatch => (
    FriendRequestAPIUtil.updateFriendRequest(request).then(
        (record) => dispatch(updateAFriend(record.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)
