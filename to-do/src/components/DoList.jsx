import React, { useState, useEffect } from "react";
import RenderList from "./RenderList";

const DoList = ({ doTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop }) => {
  const [filterDate, setFilterDate] = useState("");
  const [sortList, setSortList] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(doTasks);

  useEffect(() => {
    let filtered = [...doTasks];

    // Фільтруємо за датою, якщо обрана фільтрація
    if (filterDate) {
      filtered = filtered.filter((task) => task.date === filterDate);
    }

    // Сортуємо список, якщо обрано сортування
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

      />
    </div>
  );
};

export default DoList;
