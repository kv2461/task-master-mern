import React from 'react';

export default function TaskList({task,handleDelete,handleComplete}) {
    return(
        <div className='taskContainer'>
            <h4
                className='taskName'
                style={task.taskCompleted?{textDecoration:'line-through'}:null}
            >
                <a href={`http://www.google.com/search?q=${task.taskName}`} target='_blank'>{task.taskName}</a>
            </h4>
            <h5 
                className='taskInstructions'
                style={task.taskCompleted?{textDecoration:'line-through'}:null}
            >
                {task.taskInstructions}
            </h5>
            <div className='taskButtons'>
                <button onClick={handleDelete}>Delete</button>
                <button type= 'button' onClick={handleComplete}>Complete</button>
            </div>
        </div>
    )
}
