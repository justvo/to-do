import React from "react";
import "./style/DoneList.css";
const RenderList = React.forwardRef((props,ref) => {
  const { taskList, doOrDone, removeTodo, onTaskDragStart,
    onTaskDragEnd, onTaskDrop,handleTouchStart,
    handleTouchMove,handleTouchEnd }=props
    
  return (
    <ul
      className={doOrDone}
      ref={ref}
      onDrop={(e) => onTaskDrop(e, doOrDone)}
      onDragOver={(e) => e.preventDefault()}


    >
      {taskList.map((todo, index) => (
        <li key={index}
          draggable
          onDragStart={(e) => onTaskDragStart(e, doOrDone, index)}
          onDragEnd={onTaskDragEnd}
          onTouchStart={(e) => handleTouchStart(e, index,doOrDone,todo)}
          onTouchMove={(e)=>handleTouchMove(e)}
          onTouchEnd={(e) => handleTouchEnd(e, index)}
        >
          {todo && todo.task} (Due: {todo && todo.date}){todo.power}
          <button onClick={() => removeTodo(index, true)}>Remove</button>
        </li>
      ))}
    </ul>
  )
})
export default RenderList;       