import React from "react";
import { TodoContext } from "../TodoContext";
import './TodoForm.css'

function TodoForm(){
    const [newTodoValue, setNewTodoValue] = React.useState('')
    const {
        addTodo,
        setOpenModal
    }= React.useContext(TodoContext)

    const onChange= (event) =>{
        setNewTodoValue(event.target.value)
    }

    const onCancel = () =>{
        setOpenModal(false)
    }
    const onSubmit = (event) =>{
        /*Evita que la pagina se recarge */
        event.preventDefault()
        addTodo(newTodoValue)
        setOpenModal(false)
    }

    return(
        <form onSubmit={onSubmit}>
            <label>Agregar tu nuevo ToDo</label>
            <textarea 
            value={newTodoValue}
            onChange={onChange}
                placeholder="Escribe tu nuevo ToDo"
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    className="TodoForm-button TodoForm-button--cancel"
                    onClick={onCancel}
                >Cancelar
                </button>
                <button
                type="submit"
                className="TodoForm-button TodoForm-button--add"
                
                >
                    Añadir</button>
            </div>
        </form>
    )
}

export { TodoForm }