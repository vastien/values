import React, {useState, useRef, useEffect} from 'react'
import {TodoList} from './components/TodoList'
import {v4 as uuidv4} from 'uuid'
import './App.css';

const KEY = "todoApp.todos";

export function App(){
    const [todos, setTodos] = useState([])
    const todoTaskRef = useRef()
    
     useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if(storedTodos){
            setTodos(storedTodos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);

    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed;
        setTodos(newTodos)
    }
    const message = `<> with ♥ by Bastián Escribano` 
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;
        else{
            setTodos((prevTodo) =>{
                return [...prevTodo, {id: uuidv4(), task, completed: false}]
            })
        }

        todoTaskRef.current.value = null;
    }
    
    const handdleClear = (id) =>{
        const newTodos = todos.filter((todo) => !todo.completed)
        setTodos(newTodos);

    }
    
    return(<>
        <h2>To do with Locale Storage</h2>

        <input ref={todoTaskRef} type="text" placeholder="New task" />
        <button onClick={handleTodoAdd}>
➕</button>
        <button onClick={handdleClear}>🗑️</button>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>

    <footer className="footer">{message}</footer>
       </>)}