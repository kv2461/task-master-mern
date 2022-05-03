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

  function getParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
  }

  useEffect(()=> {
    let _id = getParameter('id');
    if (_id) {
      Axios.get('http://localhost:3001/getTasks', {
    params: {
      _id:_id
    }
    }).then((response)=>{
      setTaskList(response.data[0].tasks[0]);
    });
      setTaskToLoad(_id);
    }
  },[])

  const taskElements = taskList.map(task=><TaskList 
    task={task}
    handleDelete = {()=>deleteTask(task)}
    handleComplete= {()=>completeTask(task)}
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
  
  const completeTask = (task) => {
    const updatedList = taskList.map((t) => {
      if (t.key === task.key) {
        const updatedTask = {
          ...t,
          taskCompleted:!t.taskCompleted
        };

        return updatedTask;
      }
      return t;
    });

    setTaskList(updatedList);
  }

  const createTasks = () => {
    Axios.post('http://localhost:3001/createTasks',{
      username:username,
      tasks:[taskList]
    }).then((response)=>{
      alert('User Created');
      setIdDisplay(`http://localhost:3000/?id=${response.data._id}`);
      setTaskToLoad(response.data._id)
    })
  }

  const loadTask = () => {
    Axios.get('http://localhost:3001/getTasks', {
    params: {
      _id:taskToLoad
    }
    }).then((response)=>{
      if (response.data[0] !== undefined) {
        setTaskList(response.data[0].tasks[0]);
      } else {
        alert('unable to find')
      }
    });
  }

  function deleteTask(task) {
    setTaskList(taskList.filter(t => t !== task))
  }

  const updateTasks = (id) => {
    Axios.get('http://localhost:3001/getTasks', {
      params: {
        _id:id,
      }
    }).then((response => {
      if (response.data[0].username === username) {
        const tasks = taskList;
        Axios.put('http://localhost:3001/updateTasks', {tasks: tasks, _id:id})
        setIdDisplay(`http://localhost:3000/?id=${id}`);

      } else {
        alert('username does not match');
      }
    }))
  }

  const deleteTasks = (id) => {
    Axios.get('http://localhost:3001/getTasks', {
      params: {
        _id:id
      }
    }).then ((response)=> {
      if(response.data[0].username === username) {
        Axios.delete(`http://localhost:3001/deleteTasks/${id}`)
        .then(()=>{
          setTaskList([]);
        })
      } else {
        alert('username does not match')
      }
    })
  }
  

  return (
    <div className="App">

      <h1>Task Master</h1>
      <h2>{idDisplay?<h2>URL: {idDisplay}</h2>:null}</h2>
      <CreateTask
        username={username}
        handleSetUserName={(e)=>{setUsername(e.target.value)}}
        handleCreateTasks={createTasks}
      />
      <LoadTask
        handleTaskToLoad={(e)=>{setTaskToLoad(e.target.value)}}
        loadTaskValue = {taskToLoad}
        handleLoadTask={loadTask}
        handleUpdateTasks={()=>updateTasks(taskToLoad)}
        handleDeleteTasks={()=>deleteTasks(taskToLoad)}
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

    </div>
    
  );
}

export default App;
