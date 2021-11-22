import React from "react";

class FutureEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  componentDidMount() {
    
    this.props.fetchEvents();
    this.props.receiveInvites();
    this.props.fetchFriendRequests();
    this.props.fetchUsers();
    // if (this.props.preJoinedEvent !== "") {
    //   this.props.updateCurrentUser({
    //     id: this.props.currentUser.id,
    //     eventsJoined: this.props.preJoinedEvent,
    //   });
    //   this.props.updateEvent({
    //     id: this.props.preJoinedEvent,
    //     guests: this.props.currentUser.id,
    //   });
    // }
  }

  componentDidUpdate() {
    // if (
    //   this.props.preJoinedEvent !== "" &&
    //   !this.props.currentUser.eventsJoined.includes(this.props.preJoinedEvent)
    // ) {
    //   this.props.updateCurrentUser({
    //     id: this.props.currentUser.id,
    //     eventsJoined: this.props.preJoinedEvent,
    //   });
    //   this.props.updateEvent({
    //     id: this.props.preJoinedEvent,
    //     guests: this.props.currentUser.id,
    //   });
    // }
    this.props.receiveInvites(); 
    
    this.props.fetchFriendRequests();
    this.props.fetchUsers()
    
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  submitFriendRequest(name) {
    // return (e) => {e.preventDefault();
    
    const user = this.props.users.filter(user => user.name === name)[0];
    if (user) this.props.createFriendRequest({recipient: user._id})
    
  }

  handleApprove(invite) {
    this.props.updateFriend({
      status: "approved",
      requester: invite.requester,
    });
  }

  handleReject(invite) {
    this.props.updateFriend({ status: "denied", requester: invite.requester });
  }

  render() {

    const { events, currentUser, invites, users } = this.props;
    const myEvents = events.filter(
      (event) => event.hostId === currentUser.user.id
    );
    const myJoinedEvents = events.filter((event) =>
      event.guests.includes(currentUser.user.id)
    );
    let displayMyEvents = myEvents.map((event, eventId) => {
      return (
        <div key={eventId} className="profile-event-page">
          <div className="p-event-container-title"></div>

          <div className="profile-event-container">
            <div className="profile-event-content">
              <img className="p-e-img" src={event.imageUrl} />

              <div className="profile-event-detials">
                <div className="p-event-time">
                  <div className="p-e-t">{event.time}</div>
                </div>
                <div className="p-event-name">
                  <div className="p-e-n">{event.name}</div>
                </div>
                <div className="p-event-desc">
                  <div className="p-e-d">{event.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    let displayMyJoinedEvents = myJoinedEvents.map((event, joinedId) => {
      return (
          <div key={joinedId} className="profile-event-page">
            <div className="p-event-container-title"></div>

            <div className="profile-event-container">
              <div className="profile-event-content">
                <img className="p-e-img" src={event.imageUrl} />
                <div className="profile-event-detials">
                  <div className="p-event-time">
                    <div className="p-e-t">{event.time}</div>
                  </div>

                  <div className="p-event-name">
                    <div className="p-e-n">{event.name}</div>
                  </div>
                  <div className="p-event-desc">
                    <div className="p-e-d">{event.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    });
    return (
      <div>
        <div className="p-event-container-title">
          UPCOMING EVENTS
          {displayMyJoinedEvents}
        </div>

        <div className="p-event-container-title">
          HOST EVENTS
          {displayMyEvents}
        </div>

        <div className="profile-event-page">
          <div className="p-event-container-title">FRIENDS</div>
          <h3>Friend Requests From</h3>
                  <ul>
                    {
                    Object.values(this.props.invites).map((invite) => 
                      {if (invite.status === "pending"){
                        <li>{Object.values(users).filter(user => user._id === invite.requester)[0].name}
                        <button onClick={this.handleApprove.bind(this, invite)}>Approve</button>
                        <button onClick={this.handleReject.bind(this, invite)}>Deny</button>
                        </li>
                      }}
                     
                    )}
                  </ul>
            <h3>Send a friend request</h3>
                <form onSubmit={this.submitFriendRequest.bind(this, this.state.name)}>
                  <label>Name</label>
                  <input type="text" onChange={this.update('name')}/>
                  <button type="submit">Submit</button>
                </form> 
                
                {/* <div>{display}</div> */}
          


          <div className="profile-friends-container">
            <div className="profile-event-content">
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/emily.png"
              />
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/feifei2.JPG"
              />
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/hien.png"
              />
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/sigdha.png"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FutureEvent;
