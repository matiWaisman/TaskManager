import React from "react";
import "../App.css";
import Task from "./Task";

const ListadoTasks = (props) => {
  return (
    <>
      <ul className="todoList">
        {props.tasks.map((task) => (
          <Task
            task={task}
            saveTaskToDelete={props.saveTaskToDelete}
            guardarTareaAEditar={props.guardarTareaAEditar}
            key={task._id}
          />
        ))}
      </ul>
    </>
  );
};
export default ListadoTasks;
