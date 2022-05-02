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

  const updateTasks = (id) => {
    const tasks = taskList;
    Axios.put('http://localhost:3001/updateTasks', {tasks: tasks, _id:id}) 
  }

  const deleteTasks = (id) => {
    Axios.delete(`http://localhost:3001/deleteTasks/${id}`)
      .then(()=>{
        setTaskList([]);
      })
  }
  

  return (
    <div className="App">

      <LoadTask
        handleTaskToLoad={(e)=>{setTaskToLoad(e.target.value)}}
        loadTaskValue = {taskToLoad}
        handleLoadTask={loadTask}
      />

      <button type='button' onClick={()=>updateTasks(taskToLoad)}>Update List</button>
      <button type='button' onClick={()=>deleteTasks(taskToLoad)}>Delete List</button>

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
