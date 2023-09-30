import {useState, useEffect} from 'react';
import Todo from './Todo';
import NewStageInput from './NewStageInput';

function Stage(props) {
    const {stage, user, setStages, todos, setTodos} = props;
    const [stageTodos, setStageTodos] = useState([]);
    const [newStageName, setNewStageName] = useState(null);

    useEffect(() => {
        todos.length > 0 ? setStageTodos(todos.filter(todo => todo.stage === stage)) : null;
    }, [todos, stage])

    const addNewStage = () => {
        setStages(stage => [...stage.slice(0, stage.length - 1), newStageName, stage[stage.length - 1]]);
    }

    const handleChange = (event) => {
        setNewStageName(event.target.value);
    }

    return stageTodos ? (
        <div className='todo-stage'>
            <div className='stage-name'>{stage} {stageTodos.length > 0 ? `(${stageTodos.length})` : ''}</div>
            {stageTodos.map((todo) => <Todo user={user} key={todo.id} todo={todo} setTodos={setTodos} />)}
            {stage === 'Your stage' ? <NewStageInput addNewStage={addNewStage} handleChange={handleChange} /> : ''}
        </div>
    ) : <div>Loading...</div>

}

export default Stage;