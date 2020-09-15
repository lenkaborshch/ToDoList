import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {setInterval} from 'timers';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type filterValuesType = 'all' | 'active' | 'completed';


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'Rest API', isDone: true},
    ])


    let [filter, setFilter] = useState<filterValuesType>('all');

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    const changeFilter = (value: filterValuesType) => {
        setFilter(value);
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    let tasksForToDoList = tasks;
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(task => task.isDone)
    }

    /*let [time, setTime] = useState<string>(new Date().toLocaleTimeString())

    let stopTime = setInterval(() => {
        setTime(new Date().toLocaleTimeString())
    }, 1000);*/

    return (
        <div className='App'>
            <TodoList title='What to learn' tasks={tasksForToDoList}
                      removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask} changeStatus={changeStatus}
                      filter={filter}/>
            {/*<div className='time'>
                {time}
                <button onClick={() => clearInterval(stopTime)}>
                    Stop Time
                </button>
            </div>*/}
        </div>
    );
}

export default App;