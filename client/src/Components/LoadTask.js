import React from 'react';

export default function LoadTask({handleTaskToLoad,handleLoadTask,loadTaskValue,handleDeleteTasks,handleUpdateTasks}) {

    return(
    <div className='loadTasks'>
      <input 
          type='text'
          placeholder='Task List ID'
          value={loadTaskValue}
          onChange={handleTaskToLoad}
        />
        <button type='button' onClick={handleLoadTask}>Load Tasks</button>
        <button type='button' onClick={handleDeleteTasks}>Delete Tasks</button>
        <button type='button' onClick={handleUpdateTasks}>Update Tasks</button>
      </div>
    )
}