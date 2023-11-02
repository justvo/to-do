import React from "react";

import RenderList from "./RenderList";
const DoneList = ({ doneTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop,handleTouchStart,handleTouchMove }) => {
  return (
    <div>
      <h1>Done</h1>
      <RenderList
        taskList={doneTasks}
        doOrDone='done'
        removeTodo={removeTodo}
        onTaskDragEnd={onTaskDragEnd}
        onTaskDragStart={onTaskDragStart}
        onTaskDrop={onTaskDrop}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
      />
    </div>
  )
}
export default DoneList;