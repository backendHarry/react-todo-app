import React, { useState, useRef, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title:'cooking',
      description: "lets cook on sunday",
      completed: false,
    },

    {
      id: 2,
      title:'python',
      description: "lets code on python",
      completed: true,
    },

    {
      id: 3,
      title:'react.js',
      description: "i love it",
      completed: false,
    },

    {
      id: 4,
      title:'state management',
      description:
        "love its state management, and its great!!",
      completed: false,
    },
  ]);

  const [activeTodo, setActiveTodo] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenData, setIsOpenData] = useState({
    title:'',
    description: "",
    completed: false,
  });

  const outside = useRef();
  const handleClick = (e) => {
    // e.preventDefault();
    if((outside.current == null) || (e.target.contains(outside.current))){
      setIsOpen(false)
    }

    if((outside.current) == null || (outside.current == undefined)){
      return 
    }
  }

  useEffect(() => {
     document.removeEventListener('click', handleClick);

     return (document.addEventListener('click', handleClick))
  }, [])

  const onHandleInput = (e) => {
    const newTodo = {
      id: todos.length + 1,
      description: e.target.value,
      completed: false,
    };
    const Todos = [...todos];
    Todos.unshift(newTodo);
    setActiveTodo(Todos);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setTodos(activeTodo);
    e.target.reset();
  };

  const handleComplete = (index, e) => {
    const Todos = [...todos];
    Todos[index].completed = true;
    setActiveTodo(Todos);
  };

  const handleModal = (descr) => {
    setIsOpen(true);
    setIsOpenData({
      title:descr.title,
      description: descr.description,
      completed: descr.completed,
    });
  };



  return (
    <div className="todo">
      <div className="todo-form">
        <form onSubmit={onHandleSubmit}>
          <input
            type="text"
            name="todo"
            placeholder="add todo"
            onChange={onHandleInput}
          />
          <button>add to list</button>
        </form>
      </div>

      <div className="todo-cover">
        {isOpen ? (
          <div className="modal">
            <div className="modal-container" ref={outside}>
              <div className="modal-title">
              <h1>{isOpenData.title}</h1>
              </div>
              <div className="modal-body">
                <h1 className=" description">{isOpenData.description}</h1>
                {isOpenData.completed ? (
                  <p className="description">completed</p>
                ) : (
                  <p className="description">not complete</p>
                )}
              </div>
              <button onClick= {() => setIsOpen(false)} className="off">x</button>
            </div>
          </div>
        ) : null}

        {todos.map((todo, index) => (
          <div
            className="todo-item"
            key={todo.id}
            onClick={() => handleModal(todo)}
          >
            {todo.description.length > 16 ? (
              <h1 className="todo-item description">
                {todo.description.substring(0, 15)}...
              </h1>
            ) : (
              <h1 className="todo-item description">{todo.description}</h1>
            )}

            {todo.completed ? (
              <button
                className="completedBtn"
                style={{ backgroundColor: "rgb(74, 196, 74)" }}
              ></button>
            ) : (
              <button
                onClick={() => handleComplete(index)}
                className="completedBtn"
              ></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
