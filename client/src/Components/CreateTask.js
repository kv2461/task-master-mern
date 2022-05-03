import React from 'react';

export default function CreateTask({username, handleSetUserName, handleCreateTasks}) {
    return(
        <div className='taskForm createTaskContainer'>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={handleSetUserName}
        />
        <button type='button' onClick={handleCreateTasks}>Create Tasklist</button>
      </div>
    )
}