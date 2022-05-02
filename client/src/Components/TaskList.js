import React from 'react';

export default function TaskList({task,handleDelete,handleComplete}) {
    return(
        <div>
            <h1 
                style={task.taskCompleted?{textDecoration:'line-through'}:null}
            >
                {task.taskName}
            </h1>
            <h2 
                style={task.taskCompleted?{textDecoration:'line-through'}:null}
            >
                {task.taskInstructions}
            </h2>
            <button onClick={handleDelete}>Delete</button>
            <button type= 'button' onClick={handleComplete}>Complete</button>
          </div>
    )
}
