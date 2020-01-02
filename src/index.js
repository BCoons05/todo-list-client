import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"

import TodoItem from "./todo-item"
import "./styles.css"


class App extends React.Component {
    constructor() {
        super()

        this.state = {
            todo: "",
            todos: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/todos")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    todos: data
                })
            })
    }

    handleChange = e => {
        this.setState({
            todo: e.target.value
        })
    }

    addTodo = e => {
        // stops the button from reloading the page
        e.preventDefault()
        axios({
            method: "POST",
            url: "http://localhost:5000/todo",
            headers: {"content-type": "application/json"},
            data: {
                title: this.state.todo,
                done: false
            }
        }).then(newData => {
            this.setState({
                todos: [...this.state.todos, newData.data],
                todo: ""
            })
        }).catch(error => console.log("add todo error", error))
    }

    renderTodos = () => {
        return this.state.todos.map(item => {
            return (
                <TodoItem key= {item.id} item={item} />
            )
        })
    }

    render() {
        // console.log(this.state.todos)
        return (
            <div className="app">
                <h1>ToDo List</h1>
                <form className="add-todo" onSubmit={this.addTodo}>
                    <input
                        type="text"
                        placeholder="Add Todo"
                        onChange={this.handleChange}
                        value= {this.state.todo}
                    />
                    <button type="submit">Add Todo</button>
                </form>
                {this.renderTodos()}
            </div>
        )
    }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)