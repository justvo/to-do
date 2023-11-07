import React, { useState, useEffect } from "react";
import RenderList from "./RenderList";
import "./style/DoList.css";

const DoList = React.forwardRef((props, ref) => {
  const { doTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop,
    handleTouchStart, handleTouchMove, handleTouchEnd } = props;
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

  const resetFilter=()=>{
    setFilterDate('');
    setSortList('')

  }

  return (
    <div className="do-container">
      <h1 className="title-lists">To do</h1>

      <div className="filter-input">
        <div className="filter">

          <p>Filter</p>
          <input
            className="do-and-filter"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select value={sortList} onChange={(e) => setSortList(e.target.value)}>
            <option value="">Select sort by</option>
            <option value="dateSort">Date</option>
            <option value="importanceSort">Importance</option>
          </select>
          <button onClick={resetFilter} >Reset</button>
        </div>


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
    </div>
  );
})

export default DoList;
