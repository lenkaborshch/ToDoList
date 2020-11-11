import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0'

import {action} from '@storybook/addon-actions'
import {EditableSpan, EditableSpanPropsType} from './EditableSpan'

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeValue: (value: string) => {},
    },
} as Meta

const changeValueCallback = action('change value callback was clicked')

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>

export const EditTitle = Template.bind({})
EditTitle.args = {
    value: 'Hello',
    changeValue: changeValueCallback
}
