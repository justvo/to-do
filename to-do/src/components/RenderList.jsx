import React from "react";

import "./style/RenderList.css"
const RenderList = React.forwardRef((props, ref) => {
  const { taskList, doOrDone, removeTodo, onTaskDragStart,
    onTaskDragEnd, onTaskDrop, handleTouchStart,
    handleTouchMove, handleTouchEnd } = props

    const handleContextMenu = (e, index,doOrDone) => {
      e.preventDefault();
      const confirmed = window.confirm('Ви впевнені, що хочете видалити цей пункт?');
      console.log(taskList)
      // console.log(day);
      if (confirmed) {
        removeTodo(index,doOrDone)

      }
    };

    
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
            onContextMenu={(e) => handleContextMenu(e, index,doOrDone)}
            draggable
            onDragStart={(e) => onTaskDragStart(e, doOrDone, index)}
            onDragEnd={onTaskDragEnd}
            onTouchStart={(e) => handleTouchStart(e, index, doOrDone, todo)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={(e) => handleTouchEnd(e, index)}>
              {}
            <span className="name-tasks">{todo && todo.task}</span> <span className="due-date">(Due: {todo && todo.date})</span><span className="tasks-power">{todo.power}</span>
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