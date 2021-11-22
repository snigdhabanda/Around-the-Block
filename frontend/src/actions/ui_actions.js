export const PRE_JOIN_EVENT = "PRE_JOIN_EVENT";

export const joinPreJoinedEvent = (eventId) => ({
  type: PRE_JOIN_EVENT,
  eventId,
});
