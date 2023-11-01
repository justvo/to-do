import React from "react";

const InputComponent = ({ task, setTask, date, setDate, addTodo,power,setPower}) => {

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <select value={power} onChange={(e) => setPower(e.target.value)} >
                <option value="">Select power of task</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <button onClick={addTodo}>Add</button>
        </div>
    )
}
export default InputComponent;