import {useState, useEffect} from 'react';
import Todo from './Todo';
import NewStageInput from './NewStageInput';

function Stage(props) {
    const {stage, user, setStages} = props;
    const [todos, setTodos] = useState(null);
    const [newStageName, setNewStageName] = useState(null);

    useEffect(() => {
        const fetchUserTodos = async () => {
            const response = await fetch(`http://localhost:3000/todo/${user}/${stage}`);
            const data = await response.json();
            setTodos(data);
        };

        fetchUserTodos();
    }, [stage, user])

    const addNewStage = () => {
        setStages(stage => [...stage.slice(0, stage.length - 1), newStageName, stage[stage.length - 1]]);
    }

    const handleChange = (event) => {
        setNewStageName(event.target.value);
    }

    return todos ? (
        <div className='todo-stage'>
            <div className='stage-name'>{stage} {todos.length > 0 ? `(${todos.length})` : ''}</div>
            {todos.map((todo) => <Todo user={user} key={todo.id} todo={todo} />)}
            {stage === 'Your stage' ? <NewStageInput addNewStage={addNewStage} handleChange={handleChange} /> : ''}
        </div>
    ) : <div>Loading...</div>

}

export default Stage;