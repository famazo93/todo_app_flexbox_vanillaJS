function Todo(props) {
    const {todo, user} = props;

    const removeTodo = async () => {
        await fetch(`http://localhost:3000/todos/${user}/${todo.id}`, {
            method: "DELETE"
        })
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
                <div className="todo-date">{todo.deadline}</div>
                <div className={`todo-prio prio-${todo.priority}`}>{todo.priority} Prio</div>
            </div>

        </div>
    )
}

export default Todo;