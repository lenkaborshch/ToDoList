import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={onAddTaskClick}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}