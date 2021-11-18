import { connect } from "react-redux";
import { fetchCurrentUser} from "../../actions/users_actions";
import { fetchEvents } from "../../actions/event_actions";
import FutureEvent from "./future_event";

const mapStateToProps = (state) => ({
  // user: state.session.user,
  currentUser: state.session,
  events: Object.values(state.events)

});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureEvent);
