import React, {useCallback} from 'react'
import {FilterValuesType, TaskType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {AppRootStoreType} from './state/store'
import {useSelector} from 'react-redux'
import {Task} from './Task'

type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export const TodoList = React.memo(function (props: TodoListPropsType) {

    let tasksTodoLists = useSelector<AppRootStoreType, Array<TaskType>>(state => state.tasks[props.todolistId])

    if (props.filter === 'active') {
        tasksTodoLists = tasksTodoLists.filter(task => !task.isDone)
    }

    if (props.filter === 'completed') {
        tasksTodoLists = tasksTodoLists.filter(task => task.isDone)
    }

    const tasks = tasksTodoLists.map(task => {
        return <Task key={task.id} task={task} changeTaskStatus={props.changeTaskStatus}
                     changeTaskTitle={props.changeTaskTitle}
                     removeTask={props.removeTask} todolistId={props.todolistId}/>
    })


    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolistId), [props.todolistId, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolistId), [props.todolistId, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolistId), [props.todolistId, props.changeFilter])

    const addTask = useCallback((title: string) => props.addTask(title, props.todolistId), [props.addTask, props.todolistId])
    const removeTodoList = useCallback(() => props.removeTodoList(props.todolistId), [props.todolistId, props.removeTodoList])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todolistId), [props.todolistId, props.changeTodoListTitle])

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
})