import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0'

import {action} from '@storybook/addon-actions'
import {Task, TaskPropsType} from './Task'

export default {
    title: 'Example/Task',
    component: Task,
} as Meta

const removeTaskCallback = action('remove callback was clicked')
const changeTaskTitleCallback = action('change title callback was clicked')
const changeTaskStatusCallback = action('change status callback was clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

const baseArgs = {
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeTaskStatus: changeTaskStatusCallback,
}

export const IsNotCompletedTask = Template.bind({})
IsNotCompletedTask.args = {
    task: {id: '1', isDone: false, title: 'Css'},
    todolistId: 'todolistId1',
    ...baseArgs
}

export const CompletedTask = Template.bind({})
CompletedTask.args = {
    task: {id: '2', isDone: true, title: 'Js'},
    todolistId: 'todolistId2',
    ...baseArgs
}
