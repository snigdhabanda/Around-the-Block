import * as EventAPIUtil from "../util/event_api_util";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
const receiveEvent = (event) => ({
    type: RECEIVE_EVENT,
    event
})
const receiveEvents = (events) => ({
    type: RECEIVE_EVENTS,
    events
})
const removeEvent = () => ({
    type: REMOVE_EVENT
})
const receiveEventErrors = (errors) => ({
    type: RECEIVE_EVENT_ERRORS
})
export const createEvent = (event) => dispatch => (
    EventAPIUtil.createEvent(event).then(
        (event) => dispatch(receiveEvent(event.data)),
        (err) => dispatch(receiveEventErrors(err.response.data))
    )
)
export const updateEvent = (event) => dispatch => (
    EventAPIUtil.updateEvent(event).then(
        (event) => dispatch(receiveEvent(event.data)),
        (err) => dispatch(receiveEventErrors(err.response.data))
    )
)
export const fetchEvent = (eventId) => dispatch => (
    EventAPIUtil.fetchEvent(eventId).then(
        (event) => dispatch(receiveEvent(event.data)),
        (err) => dispatch(receiveEventErrors(err.response.data))
    )
)
export const fetchEvents = () => dispatch => (
    EventAPIUtil.fetchEvents().then(
        (events) => dispatch(receiveEvents(events.data)),
        (err) => dispatch(receiveEventErrors(err.response.data))
    )
)
export const deleteEvent = (eventId) => dispatch => (
    EventAPIUtil.deleteEvent(eventId).then(
        () => dispatch(removeEvent()),
        (err) => dispatch(receiveEventErrors(err.response.data))
    )
)