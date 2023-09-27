import React from "react";
import { connect } from "react-redux";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

const Wheel = (props) => {
  const { wheel, moveClockwise, moveCounterClockwise } = props;

  return (
    <div id="wrapper">
      <div id="wheel">
        {[1, 2, 3, 4, 5, 6].map((num, index) => {
          return (
            <div
              key={num}
              className={index === wheel ? "cog active" : "cog"}
              style={{ "--i": `${index}` }}
            >
              {index === wheel ? "B" : ""}
            </div>
          );
        })}
      </div>
      <div id="keypad">
        <button onClick={() => moveCounterClockwise()} id="counterClockwiseBtn">
          Counter clockwise
        </button>
        <button onClick={() => moveClockwise()} id="clockwiseBtn">
          Clockwise
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel,
  };
};

export default connect(mapStateToProps, {
  moveClockwise,
  moveCounterClockwise,
})(Wheel);
