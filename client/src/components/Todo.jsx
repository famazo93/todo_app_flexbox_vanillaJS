function Todo(props) {
    const {todo} = props;

    return (
        <div className="todo-added" id={`${todo.id}`}>
            <div className="todo-text">{todo.description}</div>
            <div className="todo-date">{todo.deadline}</div>
            <div className="todo-prio">{todo.priority}</div>
            <button id={`remove-${todo.id}`}>X</button>
        </div>
    )
}

export default Todo;