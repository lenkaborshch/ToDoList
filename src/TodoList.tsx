import React, {ChangeEvent} from 'react'
import {filterValuesType, TaskType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'

type TodoListPropsType = {
    id: string
    title: string
    filter: filterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export function TodoList(props: TodoListPropsType) {
//нельзя редактировать уже выполненные

    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (value: string) => {
            props.changeTaskTitle(task.id, value, props.id)
        }
        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type='checkbox' checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} changeValue={changeTaskTitle}/>
                <button onClick={removeTask}>X</button>
            </li>)
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
                <button onClick={removeTodoList}
                        style={{backgroundColor: 'red', borderRadius: '50%', marginRight: '5px'}}>X
                </button>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>

            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}