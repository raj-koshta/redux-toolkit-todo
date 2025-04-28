import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, clearAllTask } from '../features/tasks/tasksSlice';
import { fetchTask } from '../features/tasks/tasksSlice';

const Todo = () => {

    // creating state to handle new task
    const [newTask, setNewTask] = useState("");
    // console.log(newTask);
    
    // accessing task form the redux-store
    const task = useSelector((state) => state.taskReducer.task);
    
    // initializing dispatch for person actions
    const dispatch = useDispatch();

    // adding task in the list
    const handleFormSubmit = (e) => {
        e.preventDefault();

        newTask != "" ? dispatch(addTask(newTask)) : "";
        return setNewTask("")
    }

    // deleting task from the list
    const handleTaskDelete = (id) =>{
        return dispatch(deleteTask(id));
    }

    // fetching api tasks
    const handleFetchTask = () => {
        dispatch(fetchTask())
    }

    //Clear all task
    const handleClearAllTask = () => {
        dispatch(clearAllTask());
    }


  return (
    <div className='container'>
        <div className='todo-app'>
            <h1>
                <i className="fa-regular fa-pen-to-square"></i>To-do List:
            </h1>
            <div className='row'>
                <form onSubmit={handleFormSubmit}>
                    <input type='text' 
                        id='input-box' 
                        placeholder='Add a new task'
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button>Add Task</button>
                </form>
            </div>

            <div style={{display: "flex",justifyContent: "space-around", marginBottom: "25px"}}>
                <button onClick={handleFetchTask}>Fetch API Tasks</button>
                <button onClick={handleClearAllTask}>Clear All Task</button>
            </div>

            <ul id='list-container'>
                {
                    task.map((curTask, index)=>{
                        return <li key={index}>
                            <p>{index}: {curTask}</p>
                            <div>
                                <MdDeleteForever
                                    className='icon-style'
                                    onClick={()=> handleTaskDelete(index)}
                                />
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    </div>

  )
}

export default Todo