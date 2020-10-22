import {TasksStateType, TaskType} from "../App"
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer"
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todoListId: string
}

type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todoListId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    isDone: boolean
    todoListId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todoListId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        taskId: taskId,
        todoListId: todoListId
    }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        title: title,
        todoListId: todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskId: taskId,
        isDone: isDone,
        todoListId: todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        taskId: taskId,
        title: title,
        todoListId: todoListId
    }
}

const initialState: TasksStateType = {
    ['todoListId1']: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'Rest API', isDone: true}
    ],
    ['todoListId2']: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Bananas', isDone: true},
        {id: v1(), title: 'Oranges', isDone: false}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD_TASK': {
            let newTask: TaskType = {id: '0', title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case 'CHANGE_TASK_STATUS': {
            let stateCopy = {...state}
            const task = stateCopy[action.todoListId].find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE_TASK_TITLE': {
            let todolistTasks = state[action.todoListId]
            const task = state[action.todoListId].find(task => task.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {...state, [action.todoListId]: todolistTasks}
        }
        case 'ADD_TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE_TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}
