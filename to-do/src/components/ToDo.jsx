import React, { useState } from "react";
import './InputComponent';
import InputComponent from "./InputComponent";
import DoneList from "./DoneList";
import DoList from "./DoList";
function ToDo() {

  const [doTasks, setDoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  

  // const [draggedTask, setDraggedTask] = useState(null);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [power,setPower] = useState('');

  const handleTaskDragStart = (e, listType, taskIndex) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ listType, taskIndex }));
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

      />
      
      <DoneList doneTasks={doneTasks}
        onTaskDragStart={handleTaskDragStart}
        onTaskDrop={handleTaskDrop}
        removeTodo={removeTodo}

         />


    </div>
  );
}

export default ToDo;