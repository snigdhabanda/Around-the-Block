import React from "react";
import { withRouter } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";
import { HiOutlineClipboardList } from "react-icons/hi";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-us";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      isListening: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  componentDidMount() {
    this.handleListen();
  }
  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      // this.props.history.push("/events");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  handleListen() {
    //
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);

      if (transcript.includes("submit")) {
        const email = this.state.email.replaceAll(" ", "");
        const user = {
          email,
          password: this.state.password,
        };
        //for now will submit signup twice, could use debounce to solve this
        this.props.login(user);
        mic.stop();
      } else if (transcript.includes("password")) {
        const last = transcript.indexOf("word is");
        let realTranscript = transcript.slice(last + 8);
        realTranscript = realTranscript.replace("please subm", "");
        this.setState({ password: realTranscript });
      } else if (transcript.includes("email")) {
        const last = transcript.indexOf("email is");
        let realTranscript = transcript.slice(last + 8);
        realTranscript = realTranscript.replace("my pas", "");
        realTranscript = realTranscript.replace("my ", "");

        if (realTranscript.includes("at")) {
          realTranscript = realTranscript.replace("at", "@");
          this.setState({ email: realTranscript });
        } else {
          this.setState({ email: realTranscript });
        }
      }

      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }

  setIsListening(e) {
    // e.preventDefault();
    this.setState({ isListening: !this.state.isListening }, () => {
      if (this.state.isListening) {
        mic.start();
      } else {
        console.log("Mic stop");
        mic.stop();
      }
    });
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

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li style={{ marginBottom: 10 }} key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-container">
        <div className="form">
          <div className="form__content">
            <form className="form-inner" onSubmit={this.handleSubmit}>
              <div className="form__field">
                <i>
                  <FaUser style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>
              <br />
              <div className="form__field">
                <i>
                  <RiLockPasswordFill style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                />
              </div>
              <br />
              <div>
                <button className="button form__submit" type="submit">
                  <span className="button__text">LOG IN NOW</span>
                  <i>
                    <GrFormNextLink />
                  </i>
                </button>
                <br />
                {this.renderErrors()}
              </div>
              <div className="form__background">
                <span className="form__background__shape form__background__shape2"></span>
              </div>
            </form>
          </div>
        </div>
        <div className="mic">
          {this.state.isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={this.setIsListening.bind(this)}>Start/Stop</button>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
