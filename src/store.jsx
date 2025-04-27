// import { applyMiddleware, createStore } from "redux"
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { thunk } from "redux-thunk";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// const ADD_TASK = "task/add"
// const DELETE_TASK = "task/delete"
// const FETCH_TASKS = "task/fetch"

// creating initial state
const initialState = {
    task: [],
}

// ------------------------------------ Redux Toolkit ------------------------------

//!------------- NEW WAY ------------------------

export const fetchTask = createAsyncThunk(
    "task/fetchTasks",
    async () => {
        try {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=3"
            )
            const task = await res.json();
            return task;

        } catch (error) {
            console.log(error);
        }
    }

)


const taskReducer = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        addTask(state, action) {
            state.task.push(action.payload);
        },
        deleteTask(state, action) {
            state.task = state.task.filter((curTask, index) => index != action.payload)
        },
        clearAllTask(state, action) {
            state.task = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTask.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchTask.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.task = [...state.task, ...action.payload.map((curTask) => curTask.title)]; // Replace old tasks with new ones
        })
        .addCase(fetchTask.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})

export const store = configureStore({
    reducer: {
        taskReducer: taskReducer.reducer,
        fetchReducer: taskReducer.reducer,
    },
})

export const { addTask, deleteTask, clearAllTask} = taskReducer.actions;

store.dispatch(addTask("Buy goods"))
store.dispatch(addTask("Buy Mango"))
store.dispatch(addTask("Buy Apple"))



// -------------------------------------- Redux -------------------------------------------


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
