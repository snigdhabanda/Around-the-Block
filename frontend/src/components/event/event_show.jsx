import React from "react";
import { Link } from "react-router-dom";

class EventShow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  handleJoin() {
    this.props.updateCurrentUser({
      id: this.props.currentUser.id,
      eventsJoined: this.props.match.params.eventId,
    });
    this.props.updateEvent({
      id: this.props.match.params.eventId,
      guests: this.props.currentUser.id,
    });
  }

  handlePreJoin(e) {
    this.props.joinPreJoinedEvent(this.props.match.params.eventId);
  }

  render() {
    if (!this.props.event) return null;
    const joinButton = this.props.isAuthenticated ? (
      <Link
        className="join-button"
        to="/profile"
        onClick={this.handleJoin.bind(this)}
      >
        JOIN!
      </Link>
    ) : (
      <Link
        className="join-button"
        to="/signup"
        onClick={this.handlePreJoin.bind(this)}
      >
        JOIN!
      </Link>
    );
    return (
      <div className="event-show-page">
        <div className="event-show-content">
          <img
            className="show-img"
            src="https://atb-photos.s3.amazonaws.com/profile1.png"
            alt="event"
          />
          <div className="event-show-detials">
            <div className="event-details">
              <p>{this.props.event.time}</p>
              <br />
            </div>
            <div className="event-title">{this.props.event.name}</div>
            <div className="description">{this.props.event.description}</div>
            {joinButton}
          </div>
        </div>
      </div>
    );
  }
}
export default EventShow;
//
