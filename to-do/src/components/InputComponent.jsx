import React from "react";
import './style/InputComponent.css'
const InputComponent = ({ task, setTask, date, setDate, addTodo, power, setPower }) => {

    return (
        <div className="input-container">
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <input
                className="date-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <select value={power} onChange={(e) => setPower(e.target.value)} >
                <option value="">Select power of task</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button onClick={addTodo}>Add</button>
        </div>
    )
}
export default InputComponent;