import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createEvent } from "../../actions/event_actions"

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      location: "",
      imageUrl: "",
      time: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      // this.props.history.push("/events");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let event = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      imageUrl: this.state.imageUrl,
      time: this.state.time,
    };

    this.props.createEvent(event, this.props.history);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors || {}).map((error, i) => (
          <li style={{ marginBottom: 10 }} key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="event-container">
        <div className="event">
          <div className="event__content">
            <form className="event-inner" onSubmit={this.handleSubmit}>
              <div className="event__field">
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Type..."
                />
              </div>
              <div className="event__field">
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.description}
                  onChange={this.update("description")}
                  placeholder="What to do..."
                />
              </div>
              <div className="event__field">
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.time}
                  onChange={this.update("time")}
                  placeholder="When...."
                />
              </div>
              <div className="event__field">
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.location}
                  onChange={this.update("location")}
                  placeholder="Your location..."
                />
              </div>
              <div className="event__field">
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.imageUrl}
                  onChange={this.update("imageUrl")}
                  placeholder="Your pictures go here..."
                />
              </div>
              <button className="button event__submit" type="submit">
                <span className="button__text">CREATE EVENT</span>
              </button>
              <br />
              {this.renderErrors()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = () => dispatch => ({
  createEvent: (event, history) => dispatch(createEvent(event, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEventForm));