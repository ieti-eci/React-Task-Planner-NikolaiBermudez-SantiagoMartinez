import { useHistory } from "react-router";

export const TaskItem = ({ id, isChecked, taskName, onTaskChange }) => {
  const history = useHistory();

  const styleOfTheComponent = {
    textDecoration: isChecked ? "line-through" : "",
  };

  const handleClick = () => {
    history.push({
      pathname: `/tasks/${id}`,
      state: {isChecked: `${isChecked}`}
    });
    
  };

  return (
    <li>
      <input onChange={onTaskChange} checked={isChecked} type="checkbox" />
      <span style={styleOfTheComponent}>{taskName}</span>
      <button onClick={handleClick}>Edit</button>
    </li>
  );
};
