import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, IconButton, Checkbox} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {AppRootStoreType} from "./state/store";
import {useSelector} from "react-redux";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export function TodoList(props: TodoListPropsType) {
    let tasksTodoLists = useSelector<AppRootStoreType, Array<TaskType>>(state => state.tasks[props.id])

    const tasks = tasksTodoLists.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (value: string) => {
            props.changeTaskTitle(task.id, value, props.id)
        }

        return (
            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Checkbox color='primary' checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} changeValue={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>)
    })

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const addTask = (title: string) => props.addTask(title, props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasks}
            </div>

            <div>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        color={props.filter === 'all' ? 'secondary' : 'default'}>All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={props.filter === 'active' ? 'secondary' : 'default'}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={props.filter === 'completed' ? 'secondary' : 'default'}>Completed</Button>
            </div>
        </div>
    )
}