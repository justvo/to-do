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
        <li>
          <span
            key={index}
            className="item-of-todo"
            draggable
            onDragStart={(e) => onTaskDragStart(e, doOrDone, index)}
            onDragEnd={onTaskDragEnd}
            onTouchStart={(e) => handleTouchStart(e, index, doOrDone, todo)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={(e) => handleTouchEnd(e, index)}>
            {todo && todo.task} (Due: {todo && todo.date}){todo.power}
          </span>
          <button className="remove-button"
            onClick={() => removeTodo(index,doOrDone)}
          >Remove</button>
        </li>
      ))}
    </ul>
  )
})
export default RenderList;       