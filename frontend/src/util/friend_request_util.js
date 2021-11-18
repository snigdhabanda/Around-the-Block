import axios from "axios";
export const createFriendRequest = (friendId) => {
    return axios.post("/api/friend-requests/newFriendRequest", friendId)
}

export const updateFriendRequest = (request) => {
    return axios.patch("/api/friend-requests/updateFriendRequest", request)
}

export const receiveInvites = () => {
    return axios.get("/api/friend-requests/friendinvites")
}

export const receiveRequests = () => {
    return axios.get("/api/friend-requests/")
}

