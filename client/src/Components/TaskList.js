import React from 'react';

export default function TaskList({task,handleDelete,handleComplete}) {
    return(
        <div>
            <h1 style={task.taskCompleted?{display:'none'}:null}>{task.taskName}</h1>
            <h2>{task.taskInstructions}</h2>
            <button onClick={handleDelete}>Delete</button>
            {/* <button type='button' onClick={handleComplete}>Complete</button> */}
          </div>
    )
}
