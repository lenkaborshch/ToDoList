import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {filterValuesType, TaskType} from './App';

type TodoListPropsType = {
    title: string
    filter: filterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: filterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError('Title is required!');
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(task => {
                    const removeTask = () => props.removeTask(task.id);
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(task.id, e.currentTarget.checked);
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type='checkbox' checked={task.isDone} onChange={changeStatus}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>)
                })}
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

export default TodoList;