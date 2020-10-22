import {combineReducers, createStore} from "redux"
import {tasksReducer} from "./tasksReducer"
import {todolistsReducer} from "./todolistsReducer"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer)

export type AppRootStoreType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store

