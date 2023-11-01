import React, { useState } from "react";
import './InputComponent';
import InputComponent from "./InputComponent";
import DoneList from "./DoneList";
import DoList from "./DoList";
function ToDo() {

  const [doTasks, setDoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const [draggedTask, setDraggedTask] = useState(null);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const handleTaskDragStart = (e, listType, taskIndex) => {
    setDraggedTask({ listType, taskIndex });
  };

  const handleTaskDragEnd = () => {
    setDraggedTask(null);
  };

  const handleTaskDrop = (e, listType) => {
    e.preventDefault();
    if (draggedTask) {
      const { listType: sourceListType, taskIndex } = draggedTask;
      if (listType !== sourceListType) {
        if (listType === 'do') {
          const taskToMove = doTasks[taskIndex];
          setDoTasks((prevTasks) => {
            prevTasks.splice(taskIndex, 1);
            return prevTasks;
          });
          setDoneTasks((prevTasks) => [...prevTasks, taskToMove]);
        } else if (listType === 'done') {
          const taskToMove = doneTasks[taskIndex];
          setDoneTasks((prevTasks) => {
            prevTasks.splice(taskIndex, 1);
            return prevTasks;
          });
          setDoTasks((prevTasks) => [...prevTasks, taskToMove]);
        }
      }
      setDraggedTask(null);
    }
  };

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
    setDoTasks([...doTasks, { task, date }]);
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
    <div>
      <InputComponent task={task}
        addTodo={addTodo}
        date={date}
        setDate={setDate}
        setTask={setTask} 
        />

      <DoList doTasks={doTasks}
        removeTodo={removeTodo}
        onTaskDragStart={handleTaskDragStart}
        onTaskDragEnd={handleTaskDragEnd}
        onTaskDrop={handleTaskDrop}
      />

      <DoneList doneTasks={doneTasks}
        onTaskDragStart={handleTaskDragStart}
        onTaskDragEnd={handleTaskDragEnd}
        onTaskDrop={handleTaskDrop}
        removeTodo={removeTodo} />

    </div>
  );
}

export default ToDo;