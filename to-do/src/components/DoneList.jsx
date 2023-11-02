import React from "react";

import RenderList from "./RenderList";
const DoneList = ({ doneTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop }) => {
  return (
    <RenderList
    taskList={doneTasks}
    doOrDone='done'
    removeTodo={removeTodo}
    onTaskDragEnd={onTaskDragEnd}
    onTaskDragStart={onTaskDragStart}
    onTaskDrop={onTaskDrop}
    />
  )
}
export default DoneList;