import React from "react";
import { Link } from "react-router-dom";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrNotes } from "react-icons/gr";
import { RiBluetoothConnectLine } from "react-icons/ri";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdown: false,
    };

    this.logoutUser = this.logoutUser.bind(this);
    // this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.setState({ isDropdown: !this.state.isDropdown });
  }
  // Selectively render links dependent on whether the user is logged in
  // submitFriendRequest(name) {
  //   // return (e) => {e.preventDefault();
  //   const user = this.props.users.filter((user) => user.name === name)[0];
  //   if (user) this.props.createFriendRequest({ recipient: user._id });
  // }

  // handleApprove(invite) {
  //   this.props.updateFriend({
  //     status: "approved",
  //     requester: invite.requester,
  //   });
  // }

  // handleReject(invite) {
  //   this.props.updateFriend({ status: "denied", requester: invite.requester });
  // }

  render() {
    const { events, users, invites, currentUser } = this.props;

    // let display = Object.values(invites).map((invite, inviteId) => {
    //   return (
    //     <div>
    //       <h3>Friend Requests From</h3>
    //       <ul>
    //         <li key={inviteId}>
    //           {
    //             Object.values(users).filter(
    //               (user) => user._id === invite.requester[0]
    //             ).name
    //           }
    //           <button onClick={this.handleApprove.bind(this, invite)}>
    //             Approve
    //           </button>
    //           <button onClick={this.handleReject.bind(this, invite)}>
    //             Deny
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   );
    // });
    // const { isDropdown } = this.state;
    // let dropdownMenu;
    // if (isDropdown && this.props.loggedIn) {
    //   dropdownMenu = (
    //     <div className="loggedin-drop-down">
    //           <div>{display}</div>
    //     </div>
    //   );
    // }
    const getLinks = this.props.loggedIn ? (
      <div className="logged-in">
        <div className="logged-in-profile-icon">
          <button className="btn" onClick={this.logoutUser}>
            Logout
          </button>
          <Link className="btn nav-button" to="/events/create">
            Create Event
          </Link>
          <IoMdNotificationsOutline
            className="svg"
            // onClick={this.toggleDropdown}
          />
          {/* <div>{dropdownMenu}</div> */}
          <Link className="link" to="/profile">
            <CgProfile />
          </Link>
        </div>
      </div>
    ) : (
      // </div>
      <div className="nav-bar-btn">
        <Link className="btn" to="/signup">
          Signup
        </Link>
        <Link className="btn" to="/login">
          Login
        </Link>
      </div>
    );
    return (
      <div>
        <div className="nav-bar">
          <Link to="/" className="app-name">
            Around the <span className="app-span">Block</span>
          </Link>
          {getLinks}
        </div>
      </div>
    );
  }
}

export default NavBar;
