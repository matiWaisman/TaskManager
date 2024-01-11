import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./Components/InputField";
import Footer from "./Components/Footer";
import ListadoTasks from "./Components/ListadoTasks";
import PageFooter from "./Components/pageFooter";
import { Helmet } from "react-helmet";

function App() {
  const [listadoTasks, setListadoTasks] = useState([]);
  const [Tarea, guardarTarea] = useState();
  const [PendingTasks, setPendingTasks] = useState();
  const [TaskToDelete, saveTaskToDelete] = useState();
  const [TareaAEditar, guardarTareaAEditar] = useState();

  const getTasks = async () => {
    const response = await fetch("https://tm-server.vercel.app/api/v1/tasks");
    const responseJson = await response.json();
    var cantidadUnfinished = 0;
    if (responseJson) {
      setListadoTasks(responseJson.tasks);
      responseJson.tasks.map((task) => {
        if (task.completed === false) {
          cantidadUnfinished++;
        }
      });
      setPendingTasks(cantidadUnfinished);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const subirTareaADb = async () => {
      try {
        await axios.post("https://tm-server.vercel.app/api/v1/tasks", {
          name: Tarea.name,
          completed: Tarea.completed,
        });
      } catch (error) {}
      getTasks();
    };
    subirTareaADb();
  }, [Tarea]);

  useEffect(() => {
    deleteTask(TaskToDelete);
  }, [TaskToDelete]);

  useEffect(() => {
    const editarTask = async () => {
      try {
        await axios.patch(
          `https://tm-server.vercel.app/api/v1/tasks/${TareaAEditar._id}`,
          {
            name: TareaAEditar.name,
            completed: TareaAEditar.completed,
          }
        );
      } catch (error) {}
      getTasks();
    };
    editarTask();
  }, [TareaAEditar]);

  const deleteTask = async (TareaParaEliminar) => {
    try {
      await axios.delete(
        `https://tm-server.vercel.app/api/v1/tasks/${TareaParaEliminar._id}`
      );
    } catch (error) {}
    getTasks();
  };

  const eliminarTareas = async () => {
    listadoTasks.forEach((task) => {
      deleteTask(task);
    });
  };

  return (
    <>
      <div className="backgound">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Task Manager Mern</title>
          <meta name="description" content="Task Manager Mern" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <div className="wrapper">
          <header>Todo app MERN</header>
          <InputField guardarTarea={guardarTarea} msg="Add your new task" />
          <ListadoTasks
            tasks={listadoTasks}
            saveTaskToDelete={saveTaskToDelete}
            guardarTareaAEditar={guardarTareaAEditar}
          />
          <Footer pendingTasks={PendingTasks} eliminarTareas={eliminarTareas} />
        </div>
        <PageFooter />
      </div>
    </>
  );
}

export default App;
