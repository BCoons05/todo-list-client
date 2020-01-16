import React, { useState } from "react"

function TodoItem(props) {
    const [done, setDone] = useState(props.item.done)

    const toggleDone = () => {
        fetch(`https://bpc-todo-flask.herokuapp.com/todo/${props.item.id}`, {
        // fetch(`https://bpc-todo-express.herokuapp.com/todo/${props.item.id}`, {
        // fetch(`http://localhost:5000/todo/${props.item._id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                done: !done
            })
        })
        .then(setDone(!done))
        .catch(error => console.log("toggleDone error: ", error))
    }

    return (
        <div className="todo-item">
            <input 
                type="checkbox" 
                defaultChecked={done}
                onClick={toggleDone}
            />
            <p className={done ? "done" : null}>{props.item.title}</p>
            <button onClick={() => props.deleteTodo(props.item.id)}>X</button>
            {/* <button onClick={() => props.deleteTodo(props.item._id)}>X</button> */}
        </div>
    )
}

export default TodoItem