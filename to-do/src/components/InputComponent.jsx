import React from "react";

const InputComponent = ({ task, setTask, date, setDate, addTodo }) => {

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
            <button onClick={addTodo}>Add</button>
        </div>
    )
}
export default InputComponent;