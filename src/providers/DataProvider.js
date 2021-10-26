import React, { useState } from "react";

export const tasks = [
  {
    id: "1",
    isCompleted: false,
    name: "Arreglar el checklist del edit",
  },
  {
    id: "2",
    isCompleted: false,
    name: "Limpiar el campo del create task cuando se crea tarea",
  },
  {
    id: "3",
    isCompleted: false,
    name: "Mejorar el UI usando CSS",
  },
  {
    id: "4",
    isCompleted: false,
    name: "Modificar la estructura del proyecto(UI y lógica) para que el Task tenga los siguientes campos: [name, description,assignedTo, dueDate, [status(TODO, IN_PROGRESS,REVIEW, DONE)]",
  }
];

const initialData = { tasks };

const DataContext = React.createContext(initialData);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const value = { data, setData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = React.useContext(DataContext);

  return context;
};
