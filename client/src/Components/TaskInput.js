import React from 'react';

export default function TaskInput({handleAddTask,handleName,handleInstructions,taskNameValue,taskInstructionValue}) {
    return(
    <div className='taskInputContainer taskForm'>
        <div className='taskInputs'>
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
        </div>
      <button type='button' onClick={handleAddTask}>Add</button>
      </div>
    )
}