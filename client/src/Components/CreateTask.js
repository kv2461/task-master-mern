import React from 'react';

export default function CreateTask({username, handleSetUserName, handleCreateTasks, idDisplay}) {
    return(
        <div>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={handleSetUserName}
        />
        <button type='button' onClick={handleCreateTasks}>Create Tasklist</button>
        <h2>{idDisplay?<h2>URL: {idDisplay}</h2>:null}</h2>
      </div>
    )
}