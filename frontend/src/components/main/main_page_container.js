import { connect } from 'react-redux';
import { fetchEvents, fetchEvent } from '../../actions/event_actions';
import MainPage from './main_page';

const mapStateToProps = (state) => {
    // console.log(state)
  
    return {events: Object.values(state.events)}
    
};

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    // fetchEvent: (eventId) => dispatch(fetchEvent(eventId))

});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);