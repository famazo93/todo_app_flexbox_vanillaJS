import Todo from './Todo';
import {useState, useEffect} from 'react';
import TodoInput from './TodoInput';

function Todos(props) {
    const {user} = props;
    const [todos, setTodos] = useState(null);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`http://localhost:3000/todo/${user}`);
            const {todos} = await response.json();
            setTodos(todos);
        }; 

        getTodos();
    }, [user])

    return todos ? (
        <div className="todos-container" id="container-field">
            <TodoInput />
            <div className='new-todos'>    
                {todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </div>
        </div>
    ) : (
        <div className="container" id="container-field">
            <TodoInput />
        </div>
    )
}

export default Todos;