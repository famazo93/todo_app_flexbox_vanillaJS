import Stage from './Stage';
import {useState, useEffect} from 'react';
import TodoInput from './TodoInput';

function Todos(props) {
    const {user} = props;
    const [stages, setStages] = useState(null);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`http://localhost:3000/todo/${user}`);
            const data = await response.json();

            const allStages = [];
            for (let todo of data.todos) {
                allStages.push(todo.stage);
            }
    
            const uniqueStages = [... new Set(allStages)];
            setStages(uniqueStages);
        };

        getTodos();
    }, [user])

    return stages ? (
        <div className="todos-container" id="container-field">
            <TodoInput />
            <div className='new-todos'>    
                {stages.map((stage) => <Stage key={stage} stage={stage} user={user} />)}
            </div>
        </div>
    ) : (
        <div className="container" id="container-field">
            <TodoInput />
        </div>
    )
}

export default Todos;