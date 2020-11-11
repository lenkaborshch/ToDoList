import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0'

import {action} from '@storybook/addon-actions'
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator'
import {TodoList, TodoListPropsType} from './TodoList'

export default {
    title: 'Example/TodoList',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator],
} as Meta

const removeTaskCallback = action('remove callback was clicked')
const changeTaskTitleCallback = action('change title callback was clicked')
const changeTaskStatusCallback = action('change status callback was clicked')
const changeFilterCallback = action('change filter callback was clicked')
const addTaskCallback = action('add task callback was clicked')
const removeTodoListCallback = action('remove todolist callback was clicked')
const changeTodoListTitleCallback = action('change todolist title callback was clicked')

const Template: Story<TodoListPropsType> = (args) => <TodoList {...args}/>

const baseArgs = {
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeFilter: changeFilterCallback,
    addTask: addTaskCallback,
    removeTodoList: removeTodoListCallback,
    changeTodoListTitle: changeTodoListTitleCallback,
}

export const TodolistWithActiveFilter = Template.bind({})
TodolistWithActiveFilter.args = {
    todolistId: 'todolistId1',
    title: 'What to learn',
    filter: 'active',
    ...baseArgs
}

export const TodolistWithCompletedFilter = Template.bind({})
TodolistWithCompletedFilter.args = {
    todolistId: 'todolistId2',
    title: 'What to eat',
    filter: 'completed',
    ...baseArgs
}

export const TodolistWithAllFilter = Template.bind({})
TodolistWithAllFilter.args = {
    todolistId: 'todolistId2',
    title: 'What to buy',
    filter: 'all',
    ...baseArgs
}
