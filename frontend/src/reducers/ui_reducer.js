import { PRE_JOIN_EVENT } from "../actions/ui_actions";

const initialState = { preJoinedEvent: "" };

const UiReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case PRE_JOIN_EVENT:
      newState.preJoinedEvent = action.eventId;
      return newState;
    default:
      return state;
  }
};

export default UiReducer;
