import React from 'react';

export default function LoadTask({handleTaskToLoad,handleLoadTask,loadTaskValue,handleDeleteTasks,handleUpdateTasks}) {

    return(
    <div className='taskForm loadTaskContainer'>
      <input 
          type='text'
          placeholder='Task List ID'
          value={loadTaskValue}
          onChange={handleTaskToLoad}
        />
        <div className='buttons'>
        <button type='button' onClick={handleLoadTask}>Load Task List</button>
        <button type='button' onClick={handleDeleteTasks}>Delete Task List</button>
        <button type='button' onClick={handleUpdateTasks}>Update Task List</button>
        </div>
      </div>
    )
}