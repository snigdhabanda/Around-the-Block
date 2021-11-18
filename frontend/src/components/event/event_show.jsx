import React from "react";
import { Link } from "react-router-dom";

class EventShow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }
  render() {
    if (!this.props.event) return null;
    return (
      <div className="event-show-page">
        <div className="event-show-content">
          <img
            className="show-img"
            src="https://atb-photos.s3.amazonaws.com/profile1.png"
          />
          <div clasName="event-show-detials">
            <div className="event-details">
              <p>{this.props.event.time}</p>
              <br />
            </div>
            <div className="event-title">{this.props.event.name}</div>
            <div className="description">{this.props.event.description}</div>
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
//
