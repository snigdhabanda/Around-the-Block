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

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      // confirmPassword: "",
      errors: {},
      isListening: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setIsListening = this.setIsListening.bind(this);
    this.handleListen = this.handleListen.bind(this);
    // this.clearedErrors = false;
  }

  componentDidMount() {
    this.handleListen();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

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
          name: this.state.name,
          password: this.state.password,
        };
        //for now will submit signup twice, could use debounce to solve this
        this.props.signup(user, this.props.history);
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

        if (realTranscript.includes("at")) {
          realTranscript = realTranscript.replace("at", "@");
          this.setState({ email: realTranscript });
        } else {
          this.setState({ email: realTranscript });
        }
      } else if (transcript.includes("name")) {
        let realTranscript = transcript;
        const last = transcript.indexOf("name is");
        realTranscript = transcript.slice(last + 7);
        realTranscript = realTranscript.replace("my name is ", "");
        realTranscript = realTranscript.replace("my email", "");
        realTranscript = realTranscript.replace("Mayim", "");
        // console.log("transcript");
        // console.log(transcript);
        // console.log("real transcript");
        // console.log(realTranscript);
        this.setState({ name: realTranscript });
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

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      // confirmPassword: this.state.confirmPassword,
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul className="render-errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li style={{ marginBottom: 5, fontSize: "20px" }} key={`error-${i}`}>
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
              <div className="form__field new">
                <br />
                <i>
                  <HiOutlineClipboardList style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
                />
              </div>
              <br />
              <div className="form__field new">
                <i>
                  <FaUser style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>

              <br />
              <div className="form__field new">
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
                  <span className="button__text">SIGN UP NOW</span>
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

export default withRouter(SignupForm);
