import React, { useState } from "react";
import "../App.css";

const Footer = (props) => {
  var text = `You have ${props.pendingTasks} pending tasks`;
  if (props.pendingTasks == 0 || props.pendingTasks == null) {
    text = "You don't have any pending tasks";
  }

  const handleClick = () => {
    props.eliminarTareas();
  };

  return (
    <>
      <div className="footer">
        <span> {text}</span>
        <button onClick={handleClick}>Clear</button>
      </div>
    </>
  );
};

export default Footer;
