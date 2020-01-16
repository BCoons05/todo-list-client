import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"

import TodoItem from "./todo-item"
import "./styles.css"


function App  (){
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetch("https://bpc-todo-flask.herokuapp.com/todos")
        // fetch("https://bpc-todo-express.herokuapp.com/todos")
        // fetch("http://localhost:5000/todos")
            .then(response => response.json())
            .then(data => {setTodos(data)})
    }, [])

    const addTodo = e => {
        // stops the button from reloading the page
        e.preventDefault()
        axios
            .post("https://bpc-todo-flask.herokuapp.com/todo", {
            // .post("https://bpc-todo-express.herokuapp.com/todo", {
            // .post("http://localhost:5000/todo", {
                title: todo,
                done:false
            })
        .then(newData => {
                setTodos([newData.data, ...todos])
                setTodo("")
        })
        .catch(error => console.log("add todo error", error))
    }

    const renderTodos = () => {
        return todos.map(item => {
            return (
                <TodoItem key={item.id} item={item} deleteTodo={deleteTodo} />
                // <TodoItem key={item._id} item={item} deleteTodo={deleteTodo} />
            )
        })
    }

    const deleteTodo = id => {
        fetch(`https://bpc-todo-flask.herokuapp.com/todo/${id}`, {
        // fetch(`https://bpc-todo-express.herokuapp.com/todo/${id}`, {
        // fetch(`http://localhost:5000/todo/${id}`, {
            method: "DELETE"
        })
        .then(
            setTodos(todos.filter(item => {
                // top is for flask - bottom is node/express
                return item.id !== id
                // return item._id !== id
        })))
        .catch(error => console.log("delete item error: ", error))
    }

    return (
        <div className="app">
            <h1>ToDo List</h1>
            <form className="add-todo" onSubmit={addTodo}>
                <input
                    type="text"
                    placeholder="Add Todo"
                    onChange={e => setTodo(e.target.value)}
                    value= {todo}
                />
                <button type="submit">Add Todo</button>
            </form>
            {renderTodos()}
        </div>
    )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)