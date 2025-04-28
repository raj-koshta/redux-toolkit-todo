import { store } from "../../store"
import { addTask } from "./tasksSlice"

store.dispatch(addTask("Buy goods"))
store.dispatch(addTask("Buy Mango"))
store.dispatch(addTask("Buy Apple"))