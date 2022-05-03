import React from 'react';

export default function TaskList({task,handleDelete,handleComplete,handleDecrementCounter,handleIncrementCounter}) {
    return(
        <div className='taskContainer'>
            <h4
                className='taskName'
                style={task.taskCompleted?{textDecoration:'line-through', textDecorationThickness:5}:null}
            >
                <a href={`http://www.google.com/search?q=${task.taskName}`} target='_blank' rel="noreferrer" >{task.taskName}</a>
            </h4>
            <h5 
                className='taskInstructions'
                style={task.taskCompleted?{textDecoration:'line-through', textDecorationThickness:5}:null}
            >
                {task.taskInstructions}
            </h5>
            <div className='taskCounterContainer'>
                <button type='button' onClick={handleDecrementCounter}>-</button>
                <h4>{task.taskCounter}</h4>
                <button type='button' onClick={handleIncrementCounter}>+</button>
            </div>
            <div className='taskButtons'>
                <button type='button' onClick={handleDelete}>Delete</button>
                <button type='button' onClick={handleComplete}>Complete</button>
            </div>
        </div>
    )
}
