import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const InputField = (props) => {
  const [Tarea, setTarea] = useState({
    name: "",
    completed: false,
  });

  const { name, completed } = Tarea;

  const onChange = (e) => {
    setTarea({
      ...Tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTarea(Tarea);
    if (Tarea.name != "") {
      props.guardarTarea(Tarea);
      setTarea({
        name: "",
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="inputField">
          <input
            type="text"
            placeholder={props.msg}
            name="name"
            onChange={onChange}
            value={name}
          ></input>
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
    </>
  );
};

export default InputField;
