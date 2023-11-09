import React from "react";
import "./style/RenderList.css"
const RenderList = React.forwardRef((props, ref) => {
  const { taskList, doOrDone, removeTodo, onTaskDragStart,
    onTaskDragEnd, onTaskDrop, handleTouchStart,
    handleTouchMove, handleTouchEnd } = props




  return (
    <ul
      className={doOrDone}
      ref={ref}
      onDrop={(e) => onTaskDrop(e, doOrDone)}
      onDragOver={(e) => e.preventDefault()}


    >
      {taskList.map((todo, index) => (
        
        <li className="container-of-item">
          <span
            key={index}
            className="item-of-todo"
            draggable
            onDragStart={(e) => onTaskDragStart(e, doOrDone, index)}
            onDragEnd={onTaskDragEnd}
            onTouchStart={(e) => handleTouchStart(e, index, doOrDone, todo)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={(e) => handleTouchEnd(e, index)}>
              <span className="name-tasks">{ todo.task.slice(0,10)}...</span> <span className="due-date"> {doOrDone==="do" && todo.date}</span><span className="tasks-power">{doOrDone==="do"&&todo.power}</span>
            <button className="remove-button"
              onClick={() => removeTodo(index, doOrDone)}
            >Remove</button>
          </span>
        </li>
      ))}
    </ul>
  )
})
export default RenderList;       