import React from "react";
import "./style/DoneList.css";

import RenderList from "./RenderList";
const DoneList = React.forwardRef((props,ref) => {
  const{ doneTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop,
    handleTouchStart,handleTouchMove,handleTouchEnd }=props;
  return (
    <div className="done-container">
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
        handleTouchEnd={handleTouchEnd}
        ref={ref}
      />
    </div>
  )
})
export default DoneList;