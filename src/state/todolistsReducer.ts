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

export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => ({
    type: 'REMOVE_TODOLIST',
    id: todoListId
})
export const addTodolistAC = (title: string): AddTodolistActionType => ({
    type: 'ADD_TODOLIST',
    title: title,
    todolistId: v1()
})
export const changeFilterTodolistAC = (filter: FilterValuesType, todoListId: string): ChangeFilterTodolistActionType => ({
    type: 'CHANGE_TODOLIST_FILTER',
    id: todoListId,
    filter: filter
})

export const changeTitleTodolistAC = (title: string, todoListId: string): ChangeTitleTodolistActionType => ({
    type: 'CHANGE_TODOLIST_TITLE',
    id: todoListId,
    title: title
})

const initialState: Array<TodoListType> = [
    {id: 'todoListId1', title: 'What to learn', filter: 'all'},
    {id: 'todoListId2', title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
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
            let stateCopy = [...state]
            const todoList = stateCopy.find(tl => tl.id === action.id)
            if (todoList) todoList.title = action.title
            return stateCopy

        default:
            return state
    }
}