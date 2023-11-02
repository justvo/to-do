import React,{useState} from "react";
import RenderList from "./RenderList";


const DoList = ({ doTasks, removeTodo, onTaskDragStart, onTaskDragEnd, onTaskDrop }) => {
    // const[filterDate,setFilterDate]=useState([]);
    // const[sortList,setSortList] = useState("");

    // const filterlist=(filterOption)=>{
    //     let bufList =[];
    //     if(!filterOption)return;
    //     bufList = doTasks.filter((a)=>{
    //         return a === filterOption
    //     })
    //     setFilterDate(bufList)
    // }



   return (
        <div>
            <p>filter by date</p>
            <input
                className="date-input"
                type="date"
                value={filterDate}
                onChange={(e) => filterlist(e.target.value)}
            />
            <p>sort</p>
            <select value={sortList} onChange={(e) => setSortList(e.target.value)} >
                <option value="">Select sort</option>
                <option value="dateSort">Date</option>
                <option value="importanceSort"> Importance</option>

            </select>
            <RenderList
                taskList={filterDate}
                doOrDone='do'
                removeTodo={removeTodo}
                onTaskDragEnd={onTaskDragEnd}
                onTaskDragStart={onTaskDragStart}
                onTaskDrop={onTaskDrop}
            />
        </div>
    )
}
export default DoList;