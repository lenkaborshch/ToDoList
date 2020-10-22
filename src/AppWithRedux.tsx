import React from 'react'
import './App.css'
import {TodoList} from './TodoList'
import {AddItemForm} from './AddItemForm'
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Menu} from '@material-ui/icons'
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

function AppWithRedux() {
    const classes = useStyles()

    let todoLists = useSelector<AppRootStoreType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }

    const changeFilter = (filterValue: FilterValuesType, todoListId: string) => {
        dispatch(changeFilterTodolistAC(filterValue, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }

    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTitleTodoList = (title: string, todoListId: string) => {
        dispatch(changeTitleTodolistAC(title, todoListId))
    }

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        To-do List
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let tasksForToDoList = tasks[tl.id]

                        if (tl.filter === 'active') {
                            tasksForToDoList = tasks[tl.id].filter(task => !task.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForToDoList = tasks[tl.id].filter(task => task.isDone)
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
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
                                        changeTodoListTitle={changeTitleTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux