import React from "react";
import propTypes from "prop-types";

function Button(props) {
  const className = ["btn"];
  className.push(props.className);
  return (
    <button
      type={props.type}
      className={className.join(" ")}
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  className: propTypes.string,
  type: propTypes.string,
  onClick: propTypes.func,
  style: propTypes.object,
  disabled: propTypes.func,
};
export default Button;
