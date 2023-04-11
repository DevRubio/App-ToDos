import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false)

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text)=>{
    const newTodos = [...todos]
    newTodos.push({
      completed: false,
      text,
    })
    saveTodos(newTodos)
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    /*Compiar el array de todos */
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodos = (text) => {
    const todoindex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoindex, 1);
    saveTodos(newTodos);
  };
  /*
Se encapsulta todo el codigo que queramos ejecutar, no todas las veces que se renderize nuestro componente,
Si noq ue le podamos expecificar ciertas condiciones para que se ejecute
El array nos permite definir cuando debemos ejcutar el UseEffect
si se envia el array vacio el use effect solo se va a ejcutar una sola vez 
*/
  /* console.log("Render (Antes del use Effect")
React.useEffect(()=>{
  console.log("Use Effect")
},[totalTodos])
console.log("Render (luego del use effect)") */
  return (
    <TodoContext.Provider value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodos,
        openModal,
        setOpenModal
    }}>{props.children}</TodoContext.Provider>
  );
}

export {TodoContext, TodoProvider}