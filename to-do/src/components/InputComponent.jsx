import { useState,useEffect } from 'react';
import React from "react";
import './style/InputComponent.css'
const InputComponent = ({ task, setTask, date, setDate, addTodo, power, setPower }) => {
    const [buttonStyle, changeButtonStyle] = useState({
        backgroundColor: '#a197a7',
    })

    useEffect(()=>{
        const checkIsImputEmpty =()=> {
            if(task.trim()===""||date.trim()===""||power.trim()===""){
                changeButtonStyle({
                    backgroundColor:"#a197a7",
                    disabled :true,
                })
            }else{
                changeButtonStyle({
                    backgroundColor:"#a88cb8",
                    disabled :false,
                })
            }
        }
        checkIsImputEmpty();
    },[task,date,power])


    return (
        <div className="input-container">
            <h1 className="main-titile">Todo List</h1>
            <div className="input-options-container">
                <input
                    className="input-tasks"
                    type="text"
                    placeholder="Enter a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <div className="date-input-block">
                    <span className="date-lable" >Due</span>
                    <input
                        className="date"
                        type="date"
                        placeholder="Due"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <select className="select-input" value={power} onChange={(e) => setPower(e.target.value)} >
                    <option value="">Select power of task</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button className="add-button"  style={{ backgroundColor: buttonStyle.backgroundColor }}
          disabled={buttonStyle.disabled}  onClick={addTodo}>Add</button>
            </div>
        </div>
    )
}
export default InputComponent;