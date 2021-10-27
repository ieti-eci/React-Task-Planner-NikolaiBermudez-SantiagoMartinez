import { useState } from "react";
import { useData } from "../providers/DataProvider";
import { TaskItem } from "./TaskItem";
import Button from '@mui/material/Button';

import ListItemButton from '@mui/material/ListItemButton';

import TextField from '@mui/material/TextField';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export const TaskList = () => {
  const { data, setData } = useData();
  const [textValue, setTextValue] = useState("");

  const tasks = data.tasks;

  const handleTaskChange = (index) => () => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    setData((prev) => ({ ...prev, tasks: newTasks }));
  };

  const newTask = (name) => {
    const newTask = {
      isCompleted: false,
      name: name,
    };
    setData((prev) => ({ ...prev, tasks: [...tasks, newTask] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newTask(textValue);
    setTextValue("");
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
  };

  return (

    
    <Box sx={{ display: 'block', p: 1, m: 1, bgcolor: '#00A58C', color: 'white'}}>
      <div style={{height:'1%', color: 'white'}}>
        <TextField size="small" id="outlined-basic" label="Task name" variant="outlined" value={textValue} onChange={handleTextChange} style={{padding:'2%', color: 'white'}}/>
      </div>
      <Button variant="contained" onClick={handleSubmit} style={{left:'2%'}} >Create Task</Button>
      

      <List m={{ maxWidth: 360, bgcolor: 'background.paper' }}>
      {tasks.map((task, index) =>{
        return (
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                
              </IconButton>
            }
          >
          <ListItemButton >
            <TaskItem
              id={task.id}
              isChecked={task.isCompleted}
              taskName={task.name}
              onTaskChange={handleTaskChange(index)}
            />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </Box>
  );
};
