function Todo(props) {
    const {todo} = props;

    return (
        <div className="todo added" id={`${todo.id}`}>
            <div className="todo-text">${todo.text}</div>
            <div className="todo-date">${todo.date}</div>
            <div className="todo-prio">${todo.prio}</div>
            <button id={`remove-${todo.id}`}>\u2713</button>
        </div>
    )
}

export default Todo;