import React, { useState, useRef } from "react";
import './InputComponent';
import InputComponent from "./InputComponent";
import DoneList from "./DoneList";
import DoList from "./DoList";
function ToDo() {

  const [doTasks, setDoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);



  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [power, setPower] = useState('');

  const listRef = useRef(null);
  const ghostRef = useRef(null);

  const [dragging, setDragging] = useState({
    index: -1,
    item: null,
    x: 0,
    y: 0,
    target: null,
    position: -1,
  });
  disableScroll();

  const handleTouchStart = (e, index, listType, item) => {

    const touch = e.targetTouches[0];
    const startX = touch.pageX;
    const startY = touch.pageY;
    const element = e.target;


    const ghost = document.createElement("div");
    ghost.className = "ghost";
    ghost.style.width = element.offsetWidth + "px";
    ghost.style.height = element.offsetHeight + "px";
    ghost.style.top = element.offsetTop + "px";
    ghost.style.left = element.offsetLeft + "px";
    ghost.style.position = "absolute";
    ghost.innerHTML = element.innerHTML;

    document.body.appendChild(ghost);
    ghostRef.current = ghost;

    setDragging({
      index,
      item,
      x: startX,
      y: startY,
      target: null,
      position: index,
      listType,
    });
  };

  const handleTouchMove = (e) => {
    if (dragging.item) {
      const touch = e.targetTouches[0];
      const currentX = touch.pageX;
      const currentY = touch.pageY;


      const ghost = ghostRef.current;
      // ghost.style.left = (dragging.x+ghost.style.width/2)+'px';
      ghost.style.left = (dragging.x) + 'px';
      ghost.style.top = dragging.y + 'px';

      setDragging({
        ...dragging,
        x: currentX,
        y: currentY,
        target: null,
        position: -1,
      });
    }
  };

  const handleTouchEnd = (e, index) => {
    const dorect = document.querySelector('.do')
    const donerect = document.querySelector('.done')
    if (dragging.item) {
      const ghost = ghostRef.current;
      document.body.removeChild(ghost);
      ghostRef.current = null;
      const ghostArea = ghost.getBoundingClientRect();
      const doarea = dorect.getBoundingClientRect();
      const donearea = donerect.getBoundingClientRect();


      if ((dragging.listType === 'do') && (donearea.top < dragging.y)) {
        const taskToMove = doTasks[index];
        setDoTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        setDoneTasks((prevTasks) => [...prevTasks, taskToMove]);
      } else if ((dragging.listType === 'done')&& (doarea.bottom > dragging.y)) {
        const taskToMove = doneTasks[index];
        setDoneTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        setDoTasks((prevTasks) => [...prevTasks, taskToMove]);
      }

      setDragging({
        index: -1,
        item: null,
        x: 0,
        y: 0,
        target: null,
        position: -1,
        listType: null,
      });
    }
  };



  const handleTaskDragStart = (e, listType, taskIndex, todo) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ listType, taskIndex }));
    console.log(todo);
  };



  const handleTaskDrop = (e, targetList) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const { listType, taskIndex } = JSON.parse(data);

    if (listType !== targetList) {
      if (listType === 'do') {
        const taskToMove = doTasks[taskIndex];
        setDoTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(taskIndex, 1);
          return newTasks;
        });
        setDoneTasks((prevTasks) => [...prevTasks, taskToMove]);
      } else if (listType === 'done') {
        const taskToMove = doneTasks[taskIndex];
        setDoneTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(taskIndex, 1);
          return newTasks;
        });
        setDoTasks((prevTasks) => [...prevTasks, taskToMove]);
      }
    }
  }


  function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  function enableScroll() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }



  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const inputDateValue = date;
  const inputDate = new Date(inputDateValue);
  inputDate.setUTCHours(0, 0, 0, 0);

  const addTodo = () => {

    if (inputDate < currentDate) {
      alert('choose another date');
      return;
    }
    if (task.trim() === '' || date.trim() === '') return;
    setDoTasks([...doTasks, { task, date, power }]);
    setTask('');
    setDate('');
  };

  const removeTodo = (index, doOrDone) => {
    if (doOrDone) {
      const newTodos = doTasks.slice();
      newTodos.splice(index, 1);
      setDoTasks(newTodos);
    } else {
      const newTodos = doneTasks.slice();
      newTodos.splice(index, 1);
      setDoneTasks(newTodos);
    }
  };

  return (
    <div className="main">
      <InputComponent task={task}
        addTodo={addTodo}
        date={date}
        setDate={setDate}
        setTask={setTask}
        power={power}
        setPower={setPower}
      />

      <DoList doTasks={doTasks}
        removeTodo={removeTodo}
        onTaskDragStart={handleTaskDragStart}
        onTaskDrop={handleTaskDrop}
        handleTouchEnd={handleTouchEnd}
        handleTouchMove={handleTouchMove}
        handleTouchStart={handleTouchStart}
        ref={listRef}


      />

      <DoneList doneTasks={doneTasks}
        onTaskDragStart={handleTaskDragStart}
        onTaskDrop={handleTaskDrop}
        removeTodo={removeTodo}
        handleTouchEnd={handleTouchEnd}
        handleTouchMove={handleTouchMove}
        handleTouchStart={handleTouchStart}
        ref={listRef}

      />


    </div>
  );
}

export default ToDo;