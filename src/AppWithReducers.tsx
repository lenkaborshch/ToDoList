import React, {useReducer} from 'react'
import './App.css'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Menu} from '@material-ui/icons'
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import { TodoList } from './TodoList'

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

function AppWithReducers() {
    const classes = useStyles()

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        dispatchTasks(addTaskAC(title, todoListId))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    const changeFilter = (filterValue: FilterValuesType, todoListId: string) => {
        dispatchTodolists(changeFilterTodolistAC(filterValue, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchTodolists(removeTodolistAC(todoListId))
        dispatchTasks(removeTodolistAC(todoListId))
    }

    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTitleTodoList = (title: string, todoListId: string) => {
        dispatchTodolists(changeTitleTodolistAC(title, todoListId))
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
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        todolistId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
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

export default AppWithReducers