import Stage from './Stage';
import {useState, useEffect} from 'react';
import TodoInput from './TodoInput';

function Todos(props) {
    const {user} = props;
    const [todos, setTodos] = useState(null);
    const [stages, setStages] = useState(['To Start', 'In Progress', 'Done', 'Your stage']);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`/todo/${user}`);
            const data = await response.json();
            setTodos(data.todos);

            if (data.todos) {
                const allStages = [...stages.slice(0, stages.length - 1)];
                for (let todo of data.todos) {
                    allStages.push(todo.stage);
                }
                allStages.push('Your stage');
                const uniqueStages = [... new Set(allStages)];
                setStages(uniqueStages);
            } else {
                setTodos([]);
            }
        };

        getTodos();
    }, [user])

    return todos ? (
        <div className="todos-container" id="container-field">
            <TodoInput stages={stages} setTodos={setTodos} />
            <div className='new-todos'>    
                {stages.map((stage) => <Stage key={stage} stage={stage} user={user} todos={todos} stages={stages} setStages={setStages} />)}
            </div>
        </div>
    ) : (
        <div className="todos-container" id="container-field">
            <TodoInput stages={stages} setTodos={setTodos} />
        </div>
    )
}

export default Todos;