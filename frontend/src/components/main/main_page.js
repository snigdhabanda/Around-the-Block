import React from "react";
import { Carousel } from "antd";


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
    console.log(this.props);
    this.props.fetchEvents();
  }

  onChange(a, b, c) {
    // console.log(a, b, c);
  }
  render() {
    const img = {
      0: "https://atb-photos.s3.amazonaws.com/shell.jpeg",
      1: "https://atb-photos.s3.amazonaws.com/painting.jpeg",
      2: "https://atb-photos.s3.amazonaws.com/green.jpeg",
    };
    const contents = this.props.events.map((event, idx) => {
      return (
        <div className="event-container">
          <div className="inner-container">
            <img className="img" src={img[idx]} />
            <div class="event-content">
              <div class="event-text">{event.time}</div>
              <div class="event-text">{event.name}</div>
              <div class="event-text">{event.description}</div>
              <button className="join-button">SHOW</button>
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
