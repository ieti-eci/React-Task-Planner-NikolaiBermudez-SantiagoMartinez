import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useData } from "../providers/DataProvider";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';

export const TaskForm = () => {
  const history = useHistory();
  const { data, setData } = useData();
  const { taskId } = useParams();
  const task = data.tasks.find((task) => task.id === taskId);

  const [text, setText] = useState(task?.name ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo ?? "");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [status, setStatus] = useState(task?.status ?? "");

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

  const handleAssignedTo = (e) => {
    const inputAssignedTo = e.target.value;
    setAssignedTo(inputAssignedTo);
  }

  const handleDate = () => {
    let newDate = new Date();
    setDueDate(newDate);
  }

  const handleStatus = (e) => {
    const inputStatus = e.target.value;
    setStatus(inputStatus);
  }

  const handleSave = () => {
    const newTasks = data.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: text, description: description, assignedTo: assignedTo, dueDate: dueDate, status: status};
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
    <Box sx={{ display: 'block', p: 1, m: 1, bgcolor: '#00A58C', color: 'white'}}>
      <ul>
        <li> <TextField size="small" id="outlined-basic" label="Name" variant="outlined" value={text} onChange={handleChange} style={{paddingBottom:'1%'}}/></li>
        <li> <TextField size="small" id="outlined-basic" label="Description" variant="outlined" value={description} onChange={handleChangeDescription} style={{paddingBottom:'1%'}}/></li>
        <li><TextField size="small" id="outlined-basic" label="Assigned To" variant="outlined" value={assignedTo} onChange={handleAssignedTo} style={{paddingBottom:'1%'}}/></li>
        <li><TextField size="small" id="outlined-basic" label="Date" variant="outlined" value={dueDate} onChange={handleDate} style={{paddingBottom:'1%'}}/></li>
        <li>
        <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleStatus}
        >
          <MenuItem value={'TODO'}>TODO</MenuItem>
          <MenuItem value={'IN_PROGRESS'}>IN_PROGRESS</MenuItem>
          <MenuItem value={'REVIEW'}>REVIEW</MenuItem>
          <MenuItem value={'DONE'}>DONE</MenuItem>
        </Select>
        </li>
      </ul>
      <Checkbox  onChange={() => handleCheckList()} checked={task.isCompleted}/>
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
};
