import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// creating initial state
const initialState = {
    task: [],
}

export const taskReducer = createSlice({
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

export const { addTask, deleteTask, clearAllTask} = taskReducer.actions;

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