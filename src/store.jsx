// import { applyMiddleware, createStore } from "redux"
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./features/tasks/tasksSlice";

// ------------------------------------ Redux Toolkit ------------------------------

//!------------- NEW WAY ------------------------


export const store = configureStore({
    reducer: {
        taskReducer: taskReducer.reducer,
        fetchReducer: taskReducer.reducer,
    },
})


// -------------------------------------- Redux ------- OLD way------------------------------------
// const ADD_TASK = "task/add"
// const DELETE_TASK = "task/delete"
// const FETCH_TASKS = "task/fetch"


// Step-1 Create reducer for your app
// const taskReducer = (state = initialState, action) => {
//     switch (action.type) {
    //         case ADD_TASK:
    //             return {
        //                 ...state,
        //                 task: [...state.task, action.payload]
        //             };
        
//         case DELETE_TASK:
//             const updatedTask = state.task.filter((curTask, index) => {
//                 return index != action.payload;
//             })
//             return {
//                 ...state,
//                 task: updatedTask,
//             };

//         case FETCH_TASKS:
//             return {
//                 ...state,
//                 task: [...state.task, ...action.payload ]
//             }

//         default:
//             return state;
//     }
// }

// Step-2 Create the Redux store using the reducer // OLD WAY

// export const store = createStore(
//     taskReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );
// console.log(store);

// Step-3 Log the initial state
// console.log("initial state: ", store.getState());

// Step-4 Dispatch an action to add the task
// store.dispatch(addTask("Buy some goods"))
// store.dispatch(addTask("Buy some graphs"))
// store.dispatch(addTask("Buy some Mango"))
// store.dispatch(addTask("Buy some Banana"))
// console.log("updated state: ", store.getState());

// store.dispatch(addTask("Buy some vegitables"))

// store.dispatch(deleteTask(0))
// console.log("Deleted state: ", store.getState());

// Step-5 Create an actore creators
// export function addTask(data) {
//     return {
//         type: ADD_TASK,
//         payload: data,
//     }
// }

// export function deleteTask(id) {
//     return {
//         type: DELETE_TASK,
//         payload: id,
//     }
// }

// Step-6 Creating fetch task function
// export const fetchTask = () => {
//     return async (dispatch) => {
//         try {
//             const res = await fetch(
//                 "https://jsonplaceholder.typicode.com/todos?_limit=3"
//             )
//             const task = await res.json();
//             console.log(task)

//             // Plain Redux

//             dispatch({
//                 type: "FETCH_TASKS",
//                 payload: task.map((curTask) => curTask.title),
//             })


//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
