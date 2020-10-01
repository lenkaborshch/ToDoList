import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox, TextFields} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
        /*console.log(title);*/
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTaskClick()
        }
    }

    return (
        <div>
            <TextField variant='standard'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label='Write...'
                       helperText={error}/>
            <IconButton color='primary' onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>
        </div>
    )
}