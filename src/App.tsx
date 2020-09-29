import React, {useState} from 'react'
import './App.css'
import {TodoList} from './TodoList'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type filterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'Rest API', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bananas', isDone: true},
            {id: v1(), title: 'Oranges', isDone: false}
        ]
    })

    const addTask = (title: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    const removeTask = (taskId: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    const changeFilter = (value: filterValuesType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({[newTodoListId]: [], ...tasks})
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        const task = tasks[todoListId].find(task => task.id === taskId)
        if (task) task.title = title
        setTasks({...tasks})
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) todoList.title = title
        setTodoLists([...todoLists])
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => {
                let tasksForToDoList = tasks[tl.id];

                if (tl.filter === 'active') {
                    tasksForToDoList = tasks[tl.id].filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForToDoList = tasks[tl.id].filter(task => task.isDone)
                }

                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;