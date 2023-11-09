import React, { useState, useRef } from "react";
import './InputComponent';
import './style/ToDo.css'
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

  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const inputDateValue = date;
  const inputDate = new Date(inputDateValue);
  inputDate.setUTCHours(0, 0, 0, 0);
  
  const handleTouchStart = (e, index, listType, item) => {
    disableScroll();
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
    enableScroll();
    const dorect = document.querySelector('.do')
    const donerect = document.querySelector('.done')
    if (dragging.item) {
      const ghost = ghostRef.current;
      document.body.removeChild(ghost);
      ghostRef.current = null;
      const doarea = dorect.getBoundingClientRect();
      const donearea = donerect.getBoundingClientRect();

      if ((dragging.listType === 'do') && (donearea.left < dragging.x)) {
        const taskToMove = doTasks[index];
        setDoTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks.splice(index, 1);
          return newTasks;
        });
        setDoneTasks((prevTasks) => [...prevTasks, taskToMove]);
      } else if ((dragging.listType === 'done') && (doarea.right > dragging.x)) {
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

  }
  function enableScroll() {
    document.body.style.overflow = 'auto';

  }





  const addTodo = () => {

    if (inputDate < currentDate) {
      alert('choose another date');
      return;
    }
    if (task.trim() === '' || date.trim() === ''||power.trim ==='') return;
    setDoTasks([...doTasks, { task, date, power }]);
    setTask('');
    setDate('');
    setPower('');
  };

  const removeTodo = (index, doOrDone) => {
    if (doOrDone==="do") {
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
      <div className="lists">
        <div className="lists-content">


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
      </div>

    </div>
  );
}

export default ToDo;