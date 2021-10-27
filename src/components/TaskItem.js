import { useHistory } from "react-router";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

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
      <Checkbox  onChange={onTaskChange} checked={isChecked} />
      <span style={styleOfTheComponent} >{taskName}</span>
      <Button variant="contained" onClick={handleClick} size="small" style={{left:'2%'}}>Edit</Button>
    </li>
  );
};
