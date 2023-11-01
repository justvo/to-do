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
            {todo.task} (Due: {todo.date}){" "}
            <button onClick={() => removeTodo(index,true)}>Remove</button>
          </li>
        ))}
      </ul>
    )
}
export default DoList;