import Stage from './Stage';
import {useState, useEffect} from 'react';
import TodoInput from './TodoInput';

function Todos(props) {
    const {user} = props;
    const [todos, setTodos] = useState(null);
    const [stages, setStages] = useState(null);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`http://localhost:3000/todo/${user}`);
            const data = await response.json();
            setTodos(data.todos);

            const allStages = [];
            for (let todo of data.todos) {
                allStages.push(todo.stage);
            }
            allStages.push('Your stage');
            const uniqueStages = [... new Set(allStages)];
            setStages(uniqueStages);
        };

        getTodos();
    }, [user])

    return stages ? (
        <div className="todos-container" id="container-field">
            <TodoInput stages={stages} setTodos={setTodos} />
            <div className='new-todos'>    
                {stages.map((stage) => <Stage key={stage} stage={stage} user={user} todos={todos} setTodos={setTodos} stages={stages} setStages={setStages} />)}
            </div>
        </div>
    ) : (
        <div className="todos-container" id="container-field">
            <TodoInput stages={stages} setTodos={setTodos} />
        </div>
    )
}

export default Todos;