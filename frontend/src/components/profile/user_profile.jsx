import React from "react";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    const { events, currentUser } = this.props;
    const myEvents = events.filter(
      (event) => event.hostId === currentUser.user.id
    );
    const myJoinedEvents = events.filter(
    event => event.guests.includes(
      currentUser.user.id)
    );
    //event.guests.indexOf(currentUser.user.id) != -1
    // console.log("myevents", myJoinedEvents);
    let displayMyEvents = myEvents.map((event, eventId) => {
     return (
       <div key={eventId} className="event-show-page">
         <div className="profile-content">
           <img className="show-img" src={event.imageUrl} />
    
           <div clasName="event-show-detials">
             <div className="event-details">
               <p>{event.time}</p>
               <br />
             </div>
             <div className="event-title">{event.name}</div>
             <div className="description">{event.description}</div>
           </div>
         </div>
       </div>
     )});
    let displayMyJoinedEvents = myJoinedEvents.map((event, joinedId) => {
      return (
        <div key={joinedId} className="event-show-page">
          <div className="profile-content">
            <img
              className="show-img"
              src={event.imageUrl}
            />
            <div clasName="event-show-detials">
              <div className="event-details">
                <p>{event.time}</p>
                <br />
              </div>
              <div className="event-title">{event.name}</div>
              <div className="description">{event.description}</div>
            </div>
          </div>
        </div>
      );});
    return (
      <div>
        <Link className="btn">Friend Request</Link>
        <Link className="btn" to="/events/create">
          Create Event
        </Link>
        <h1 className="event-category">My events</h1>
        <div>{displayMyEvents}</div>
        <h1 className="event-category">My joined events</h1>
        <div>{displayMyJoinedEvents}</div>
      </div>
    );
  }
}

export default UserProfile;
