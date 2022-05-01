import React from 'react';

export default function LoadTask({handleTaskToLoad,handleLoadTask,loadTaskValue}) {
    return(
    <div className='loadTasks'>
      <input 
          type='text'
          placeholder='ID Number'
          value={loadTaskValue}
          onChange={handleTaskToLoad}
        />
        <button type='button' onClick={handleLoadTask}>Load Tasks</button>
      </div>
    )
}