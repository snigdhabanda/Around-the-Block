import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props);
    this.props.fetchEvents();
  }

  onChange(a, b, c) {
    console.log(a, b, c);
  } 
  render() {
    const img = {
      0: "https://atb-photos.s3.amazonaws.com/shell.jpeg",
      1: "https://atb-photos.s3.amazonaws.com/painting.jpeg",
      2: "https://atb-photos.s3.amazonaws.com/green.jpeg",
      3: "https://atb-photos.s3.amazonaws.com/aniversary.jpeg",
      4: "https://atb-photos.s3.amazonaws.com/comedy.jpeg",
      5: "https://atb-photos.s3.amazonaws.com/plants.jpeg",
      6: "https://atb-photos.s3.amazonaws.com/galary.jpeg",
      7: "https://atb-photos.s3.amazonaws.com/dating.jpeg",
      8: "https://atb-photos.s3.amazonaws.com/sidewalk.jpeg",
    };
    const contents = this.props.events.map((event, idx) => {
      // debugger 
      return (
        <div className="event-container">
          <div className="inner-container">
            <img className="img" src={img[idx]} />
            <div class="event-content">
              <div class="event-text">{event.time}</div>
              <div class="event-text-name">{event.name}</div>
              <div class="event-text">{event.description}</div>
            
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
    );}
    };

export default MainPage;
