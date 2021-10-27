import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useData } from "../providers/DataProvider";

export const TaskForm = ({}) => {
  const history = useHistory();
  const { data, setData } = useData();
  const { taskId } = useParams();
  const task = data.tasks.find((task) => task.id === taskId);

  const [text, setText] = useState(task?.name ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleChange = (e) => {
    const inputName = e.target.value;

    setText(inputName);
  };

  const handleChangeDescription = (e) => {
    const inputDescription = e.target.value;
    setDescription(inputDescription);
  }

  const handleSave = () => {
    const newTasks = data.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: text, description: description};
      }
      return task;
    });

    setData((prev) => ({ ...prev, tasks: newTasks }));

    history.goBack();
  };

  const handleCheckList = () => {
    let updateCheckbox = data.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setData(() => ({ ...data, tasks: updateCheckbox }));
  }

    
  return (
    <form>
      <input
        type="text"
        placeholder="Task Name"
        value={text}
        onChange={handleChange}
      />
      <input type="checkbox" onChange={() => handleCheckList()} checked={task.isCompleted} />
      
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <ul>
        <li>Name: <input type="text" placeholder="Task Name" value={text} onChange={handleChange}/></li>
        <li>Description: <input type="text" placeholder="Description" value={description} onChange={handleChangeDescription}/></li>
      </ul>
    </form>
  );
};
