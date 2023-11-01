import React from "react";
const DoList = ({doTasks,removeTodo,onTaskDragStart, onTaskDragEnd, onTaskDrop})=>{
    return(
        <ul  onDrop={(e) => onTaskDrop(e, 'do')} onDragOver={(e) => e.preventDefault()}>
        {doTasks.map((todo, index) => (
          <li key={index} 
          draggable
          onDragStart={(e) => onTaskDragStart(e, 'do', index)}
          onDragEnd={onTaskDragEnd}
          >
            {todo && todo.task} (Due: {todo && todo.date}){todo.power}
            <button onClick={() => removeTodo(index,true)}>Remove</button>
          </li>
        ))}
      </ul>
    )
}
export default DoList;