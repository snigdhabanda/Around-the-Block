import React from "react";
import { Link } from "react-router-dom";

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
  }
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
    // console.log(this.props)
  }
  render() {
    // const {event} = this.props.event
    return (
      <div className="event-show-page">
        <div className="event-show-content">
          <img
            className="show-img"
            src="https://atb-photos.s3.amazonaws.com/profile1.png"
          />
          <div clasName="event-show-detials">
            <div className="event-details">
              {/* <p>{event.time}</p> */}
              <p>6pm Thur. 11/18/2021</p>
              <br />
            </div>
            <div className="event-title">Cooking Party with EVEN!</div>
            <div className="description">We are going to cook with GAS!</div>
            <Link className="join-button" to="/signup">
              JOIN!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default EventShow;
