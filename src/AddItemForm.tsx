import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onAddTaskClick = useCallback (() => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }, [props.addItem, title])

    const onChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        if(error) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }, [error])

    const onKeyPressHandler = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTaskClick()
        }
    }, [title])

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
})