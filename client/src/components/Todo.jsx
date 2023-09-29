function Todo(props) {
    const {todo, user, setTodos} = props;

    const removeTodo = async () => {
        await fetch(`http://localhost:3000/todos/${user}/${todo.id}`, {
            method: "DELETE"
        })

        setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id))
    }

    const priorities = ['High', 'Medium', 'Low', 'No'];
    const handlePrioChange = async (event) => {
        const updatedTodo = {...todo, priority: event.target.value};

        await fetch(`http://localhost:3000/todos/${user}/${todo.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updatedTodo)
        });
        
        setTodos((prevTodos) => [...prevTodos.filter(prevTodo => prevTodo.id !== todo.id), updatedTodo])
    }

    return (
        <div className="todo-added" id={`${todo.id}`}>
            <div className='todo-top-container'>
                <div className='todo-top-text-container'>
                    <div className='todo-title'>{todo.title}</div>
                    <div className="todo-text">{todo.description}</div>
                </div>
                <button onClick={removeTodo} id={`remove-${todo.id}`}>X</button>
            </div>
            <div className='todo-bottom-container'>
                <div className='todo-date'>{todo.deadline}</div>
                <select className={`todo-prio prio-${todo.priority}`} onChange={handlePrioChange}>
                    <option value={todo.priority}>{todo.priority} Prio</option>
                    {priorities.filter(prio => prio !== todo.priority).map(prio => <option key={prio} value={prio}>{prio} Prio</option>)}
                </select>
            </div>

        </div>
    )
}

export default Todo;