import {FilterValuesType, TodoListType} from "../App"
import {v1} from "uuid"

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    title: string
    todolistId: string
}

type ChangeFilterTodolistActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    filter: FilterValuesType
    id: string
}

type ChangeTitleTodolistActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    title: string
    id: string
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeFilterTodolistActionType | ChangeTitleTodolistActionType

export const removeTodolistAC = (id: string): RemoveTodolistActionType => ({type: 'REMOVE_TODOLIST', id: id})
export const addTodolistAC = (title: string): AddTodolistActionType => ({type: 'ADD_TODOLIST', title: title, todolistId: v1()})
export const changeFilterTodolistAC = (id: string, filter: FilterValuesType): ChangeFilterTodolistActionType => ({
    type: 'CHANGE_TODOLIST_FILTER',
    id: id,
    filter: filter
})

export const changeTitleTodolistAC = (id: string, title: string): ChangeTitleTodolistActionType => ({
    type: 'CHANGE_TODOLIST_TITLE',
    id: id,
    title: title
})

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD_TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]

        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => {
                return tl.id === action.id ? {...tl, filter: action.filter} : tl
            })

        case 'CHANGE_TODOLIST_TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) todoList.title = action.title
            return [...state]

        default:
            throw new Error("I don't understand this type")
    }
}