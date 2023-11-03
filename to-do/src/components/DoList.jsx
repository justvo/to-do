import React, { useState, useEffect } from "react";
import RenderList from "./RenderList";
import "./style/DoList.css";

const DoList = React.forwardRef((props,ref) => {
  const{ doTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop,
    handleTouchStart,handleTouchMove,handleTouchEnd }=props;
  const [filterDate, setFilterDate] = useState("");
  const [sortList, setSortList] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(doTasks);

  useEffect(() => {
    let filtered = [...doTasks];


    if (filterDate) {
      filtered = filtered.filter((task) => task.date === filterDate);
    }

    if (sortList === "dateSort") {
      filtered = filtered.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortList === "importanceSort") {
      filtered = filtered.sort((a, b) => a.power - b.power);
    }

    setFilteredTasks([...filtered]);
  }, [filterDate, sortList, doTasks]);

  return (
    <div>
        <h1>To do</h1>
      <p>Filter by date</p>
      <input
        className="date-input"
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <p>Sort by</p>
      <select value={sortList} onChange={(e) => setSortList(e.target.value)}>
        <option value="">Select sort</option>
        <option value="dateSort">Date</option>
        <option value="importanceSort">Importance</option>
      </select>
      <RenderList
        taskList={filteredTasks}
        doOrDone="do"
        removeTodo={removeTodo}
        onTaskDragEnd={onTaskDragEnd}
        onTaskDragStart={onTaskDragStart}
        onTaskDrop={onTaskDrop}
        handleTouchEnd={handleTouchEnd}
        handleTouchMove={handleTouchMove}
        handleTouchStart={handleTouchStart}
        ref={ref}

      />
    </div>
  );
})

export default DoList;
