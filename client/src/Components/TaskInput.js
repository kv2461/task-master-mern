import React from 'react';

export default function({handleAddTask,handleName,handleInstructions,taskNameValue,taskInstructionValue}) {
    return(
    <div className='taskInput'>
        <input 
          type='text'
          placeholder='Task Name'
          value={taskNameValue}
          onChange={handleName}
        />
        <input
          type='text'
          placeholder='Instructions'
          value={taskInstructionValue}
          onChange={handleInstructions}
        />
        <button type='button' onClick={handleAddTask}>Add</button>
      </div>
    )
}