import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const imgSize = {
  width: "100vw",
  height: "100vh",
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props);
    this.props.fetchEvents();
    this.props.fetchUsers()
  }

  onChange(a, b, c) {
    // console.log(a, b, c);
  }
  render() {
    const img = {
      0: "https://atb-photos.s3.amazonaws.com/shell.jpeg",
      1: "https://atb-photos.s3.amazonaws.com/painting.jpeg",
      2: "https://atb-photos.s3.amazonaws.com/green.jpeg",
      3: "https://atb-photos.s3.amazonaws.com/aniversary.jpeg",
      //start here
      4: "https://atb-photos.s3.amazonaws.com/comedy.jpeg",
      5: "https://atb-photos.s3.amazonaws.com/plants.jpeg",
      6: "https://atb-photos.s3.amazonaws.com/galary.jpeg",
      7: "https://atb-photos.s3.amazonaws.com/dating.jpeg",
      8: "https://atb-photos.s3.amazonaws.com/sidewalk.jpeg",
    };
    const contents = this.props.events.map((event, idx) => {
      // debugger
      return (
        <div className="event-container" key={idx}>
          <div className="inner-container">
            <img className="img" src={img[idx]} />
            <div className="event-content">
              <div className="event-text">{event.time}</div>
              <div className="event-text-name">{event.name}</div>
              <div className="event-text">{event.description}</div>

              <Link className="join-button" to={`/events/${event._id}`}>
                Show
              </Link>
              {/* <button
                className="join-button"
                onClick={() => this.props.fetchEvent(event._id)}
              >
                SHOW
              </button> */}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {this.props.events ? (
          <div className="img-background">
            <Carousel autoplay dots="arb-carousel" afterChange={this.onChange}>
              {contents}
            </Carousel>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MainPage;
