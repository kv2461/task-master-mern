import { useState,useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import TaskList from './Components/TaskList'

function App() {
  const [taskList,setTaskList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskInstructions, setTaskInstructions] = useState('');
  const [username,setUsername] = useState('');
  const [idDisplay,setIdDisplay] = useState('');
  const [taskToLoad,setTaskToLoad] = useState('');

  const taskElements = taskList.map(task=><TaskList 
    task={task}
    handleClick = {()=>handleDelete(task)}
  />);

  const addTask = () => {
    setTaskList([...taskList,{
      key: uuidv4(),
      taskName: taskName,
      taskInstructions:taskInstructions
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

  function handleDelete(task) {
    setTaskList(taskList.filter(t => t !== task))
  }

  return (
    <div className="App">

      <div className='loadTasks'>
      <input 
          type='text'
          placeholder='ID Name'
          value={taskToLoad}
          onChange={(e)=>{
            setTaskToLoad(e.target.value)
          }}
        />
        <button type='button' onClick={loadTask}>Load Tasks</button>
      </div>

      <div className='taskInput'>
        <input 
          type='text'
          placeholder='Task Name'
          value={taskName}
          onChange={(e)=>{
            setTaskName(e.target.value)
          }}
        />
        <input
          type='text'
          placeholder='Instructions'
          value={taskInstructions}
          onChange={(e)=>{
            setTaskInstructions(e.target.value)
          }}
        />
        <button type='button' onClick={addTask}>Add</button>
      </div>
      
      <div>
        {taskElements}


        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e)=>{
            setUsername(e.target.value)
          }}
        />
        <button type='button' onClick={createTasks}>Create Tasklist</button>
        <h2>{idDisplay?<h2>ID = {idDisplay}</h2>:null}</h2>
      </div>
    </div>
    
  );
}

export default App;
