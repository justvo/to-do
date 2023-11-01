import React from "react";
import "./style/DoneList.css";

const DoneList = ({ doneTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop }) => {
  return (
    <ul className="list-of-done-tasks" onDrop={(e) => onTaskDrop(e, 'done')} onDragOver={(e) => e.preventDefault()}>
      {doneTasks.map((todo, index) => (
        <li
          key={index}
          draggable
          onDragStart={(e) => onTaskDragStart(e, 'done', index)}
          onDragEnd={onTaskDragEnd}
          >
          {todo.task} (Due: {todo.date}){" "}
          <button onClick={() => removeTodo(index, false)}>Remove</button>
        </li>
      ))}
    </ul>
  )
}
export default DoneList;