import React, {useState, ChangeEvent} from 'react'
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    value: string
    changeValue: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }

    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField variant='standard'
                         value={title}
                         onBlur={deActivatedEditMode}
                         onKeyPress={e => e.key === 'Enter' ? deActivatedEditMode() : null}
                         autoFocus={true}
                         onChange={onChangeHandler}
            />
            : <span onDoubleClick={activatedEditMode}>{props.value}</span>
    )
}