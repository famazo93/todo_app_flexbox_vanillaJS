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
            <div className='stage-name'>{stage} {todos.length > 0 ? `(${todos.length})` : ''}</div>
            {todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            {stage === 'Your stage' ? <button className='add-new-stage-button'>Add New Stage</button> : ''}
        </div>
    ) : <div>Loading...</div>

}

export default Stage;