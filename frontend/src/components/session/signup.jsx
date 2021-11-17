import React from "react";
import { withRouter } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";
import { HiOutlineClipboardList } from "react-icons/hi";


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      // confirmPassword: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
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
          <li
            style={{ marginBottom: 5, fontSize: "20px"}}
            key={`error-${i}`}
          >
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
                  type="password"
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
                <br/>
                {this.renderErrors()}
              </div>
              <div className="form__background">
                <span className="form__background__shape form__background__shape2"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
