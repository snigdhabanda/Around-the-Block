import { connect } from "react-redux";
import {fetchEvent } from "../../actions/event_actions";
import EventShow from "./event_show";

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps)
    // debugger 
    // const selected_event = state.events.filter(
    //   event => event._id === ownProps.match.params.eventId
    // );
    // return {event: selected_event[0]}

    // return {event: state.events.filter(
    //   (event) => event._id === ownProps.match.params.eventId
    // )[0]}
  return {event: state.events[ownProps.match.params.eventId]}
};

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);

