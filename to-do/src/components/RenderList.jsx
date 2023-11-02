import React, { useState } from "react";
import "./style/DoneList.css";
const RenderList = ({ taskList, doOrDone, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop }) => {

  return (
    <ul
      className={doOrDone}
      onDrop={(e) => onTaskDrop(e, doOrDone)}
      onDragOver={(e) => e.preventDefault()}


    >
      {taskList.map((todo, index) => (
        <li key={index}
          draggable
          onDragStart={(e) => onTaskDragStart(e, doOrDone, index)}
          onDragEnd={onTaskDragEnd}
        >
          {todo && todo.task} (Due: {todo && todo.date}){todo.power}
          <button onClick={() => removeTodo(index, true)}>Remove</button>
        </li>
      ))}
    </ul>
  )
}
export default RenderList;       