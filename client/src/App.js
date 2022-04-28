import { useState,useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import TaskList from './Components/TaskList';
import TaskInput from './Components/TaskInput';
import LoadTask from './Components/LoadTask';
import CreateTask from "./Components/CreateTask";

function App() {
  const [taskList,setTaskList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskInstructions, setTaskInstructions] = useState('');
  const [username,setUsername] = useState('');
  const [idDisplay,setIdDisplay] = useState('');
  const [taskToLoad,setTaskToLoad] = useState('');

  const taskElements = taskList.map(task=><TaskList 
    task={task}
    handleDelete = {()=>deleteTask(task)}
    // handleComplete= {()=>completeTask(task)}
  />);


  const addTask = () => {
    setTaskList([...taskList,{
      key: uuidv4(),
      taskName: taskName,
      taskInstructions: taskInstructions,
      taskCompleted: false
    }])
    setTaskName('');
    setTaskInstructions('');
  }

  const createTasks = () => {
    Axios.post('http://localhost:3001/createTasks',{
      username:username,
      tasks:[taskList]
    }).then((response)=>{
      alert('User Created');
      setIdDisplay(response.data._id);
    })
  }

  const loadTask = () => {
    Axios.get('http://localhost:3001/getTasks', {
    params: {
      _id:taskToLoad
    }
    }).then((response)=>{
      alert('loaded');
      setTaskList(response.data[0].tasks[0]);
    });
  }

  function deleteTask(task) {
    setTaskList(taskList.filter(t => t !== task))
  }

  return (
    <div className="App">

      <LoadTask
        handleTaskToLoad={(e)=>{setTaskToLoad(e.target.value)}}
        loadTaskValue = {taskToLoad}
        handleLoadTask={loadTask}
      />

      <TaskInput 
        taskNameValue={taskName}
        taskInstructionValue = {taskInstructions}
        handleName={(e)=>{
          setTaskName(e.target.value)
        }}
        handleInstructions={(e)=>{
          setTaskInstructions(e.target.value)
        }}
        handleAddTask = {addTask}
      />
      
      {taskElements}

      <CreateTask
        username={username}
        handleSetUserName={(e)=>{setUsername(e.target.value)}}
        handleCreateTasks={createTasks}
        idDisplay={idDisplay}
      />

    </div>
    
  );
}

export default App;
