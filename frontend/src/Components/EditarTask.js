import React, { useState } from "react";
import "../App.css";

const EditarTask = (props) => {
  const [TareaEditada, setTareaEditada] = useState({
    name: props.task.name,
    completed: props.task.completed,
    _id: props.task._id,
  });

  const { name, completed } = TareaEditada;

  const onChange = (e) => {
    setTareaEditada({
      ...TareaEditada,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTareaEditada(TareaEditada);
    props.guardarTareaAEditar(TareaEditada);
    props.cerrarEdit(false);
  };

  const updateCompleted = (e) => {
    setTareaEditada({
      ...TareaEditada,
      [e.target.name]: !completed,
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Task Id: ${props.task._id}</label>
          <div className="inputEdit">
            <input
              type="text"
              placeholder={props.msg}
              name="name"
              onChange={onChange}
              value={name}
            />
          </div>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={completed}
            value={completed}
            onChange={updateCompleted}
            name="completed"
          />
          <label className="form-check-label">Completed</label>
        </div>
        <div className="submit">
          <button type="submit">Edit</button>
        </div>
      </form>
    </>
  );
};

export default EditarTask;
