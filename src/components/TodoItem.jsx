import React from 'react'

export function TodoItem({todo, toggleTodo}) {
    const {id, task, completed} = todo
    const handdleTodoClick = () =>{
        toggleTodo(id)
    }
    return (
        <li>{task} <input className="checkbox" type="checkbox" onChange={handdleTodoClick}/> 
        </li>
    )
}
