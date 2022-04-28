import React from 'react';

export default function TaskList({task,handleClick}) {
    return(
        <div>
            <h1>{task.taskName}</h1>
            <h2>{task.taskInstructions}</h2>
            <button onClick={handleClick}>Delete</button>
          </div>
    )
}
