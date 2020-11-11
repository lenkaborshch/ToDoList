import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from './EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskType} from './App'

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.todolistId, props.removeTask])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.todolistId, props.changeTaskStatus])

    const changeTaskTitle = useCallback((value: string) => {
        props.changeTaskTitle(props.task.id, value, props.todolistId)
    }, [props.todolistId, props.changeTaskTitle])

    return (
        <div className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox color='primary' checked={props.task.isDone} onChange={changeTaskStatus}/>
            <EditableSpan value={props.task.title} changeValue={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>)
})