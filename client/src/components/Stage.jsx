import {useState, useEffect} from 'react';
import Todo from './Todo';

function Stage(props) {
    const {stage, user} = props;
    const [todos, setTodos] = useState(null);

    useEffect(() => {
        const fetchUserTodos = async () => {
            const response = await fetch(`http://localhost:3000/todo/${user}/${stage}`);
            const data = await response.json();
            setTodos(data);
        };

        fetchUserTodos();
    }, [stage, user])

    return todos ? (
        <div className='todo-stage'>
            <h3>{stage}</h3>
            {todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </div>
    ) : <div>Loading...</div>

}

export default Stage;