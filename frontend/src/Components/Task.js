import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";
import EditarTask from "./EditarTask";

const Task = (props) => {
  var estiloDeLaTarea = "notFinished";
  if (props.task.completed == true) {
    estiloDeLaTarea = "finished";
  }

  const borrarTask = () => {
    props.saveTaskToDelete(props.task);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <li className={estiloDeLaTarea}>
        {props.task.name}
        <span
          className="edit"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={faEdit} />
        </span>
        <span className="trash">
          <FontAwesomeIcon icon={faTrash} onClick={borrarTask} />
        </span>
      </li>
      <Collapse in={open} className="expandible">
        <div>
          <EditarTask
            task={props.task}
            guardarTareaAEditar={props.guardarTareaAEditar}
            cerrarEdit={setOpen}
          />
        </div>
      </Collapse>
    </>
  );
};

export default Task;
