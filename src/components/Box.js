import React from "react";

function Box(props) {
  const flipBox = {
    transform: props.correctPlace !== "blank" ? "rotateX(180deg)" : "none",
    border:
      props.correctPlace !== "blank"
        ? "none"
        : props.letter
        ? "2px solid gray"
        : "2px solid #d2d5d8",
    animation: props.letter ? "box-jump-on-input 0.1s" : "none",
  };
  const flipBoxFront = {
    border: "2px solid gray",
  };
  const flipBoxBack = {
    backgroundColor: getBackGroundColor(),
    color: props.correctPlace !== "blank" ? "white" : "black",
    transform: props.correctPlace !== "blank" ? "rotateX(180deg)" : "none",
  };

  function getBackGroundColor() {
    if (props.correctPlace === "blank") {
      return "#FFFFFF";
    } else if (props.correctPlace === "no") {
      return "#787878";
    } else if (props.correctPlace === "almost") {
      // return '#d0bd55'
      return "#b19cd9";
    } else if (props.correctPlace === "yes") {
      // return '#6db562'
      return "rgb(255, 165, 178)";
    }
  }

  return (
    <div className="flip-box" style={flipBox}>
      <div className="flip-box-front" style={flipBoxFront}>
        {props.letter}
      </div>
      <div className="flip-box-back" style={flipBoxBack}>
        {props.letter}
      </div>
    </div>
  );
}

export default Box;
