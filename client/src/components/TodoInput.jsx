import Cookies from 'js-cookie';

function TodoInput(props) {
    const {stages, setTodos} = props;

    const user = Cookies.get('user');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = event.target['new-task-title'].value;
        const description = event.target['new-task-description'].value;
        const deadline = event.target['task-deadline'].value;
        const priority = event.target.priority.value;
        const stage = event.target.stage.value;

        const newTask = {
            id: Date.now(),
            title,
            description,
            deadline: deadline.length > 0 ? deadline : 'No Deadline',
            priority,
            stage
        };

        if (stage !== 'placeholder') {
            await fetch(`http://localhost:3000/todos/${user}`, {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    "Content-type": "application/json"
                }
            })
            setTodos(prevTodos => [...prevTodos, newTask]);
        } else {
            alert('Please select a stage');
        }
    }

    const handleLogout = () => {
        Cookies.remove('authenticated');
        Cookies.remove('user');
        window.location = 'http://localhost:5173';
    }


    return (
        <div className="todo" id="add-todo">
            <div className="title">Welcome back, {user}!</div>
            <form id="input-form" action="" onSubmit={handleSubmit}>
                <input className="newtask-title-input" type="text" id="new-task-title" name="new-task-title" placeholder="Headline" />
                <input className="newtask-description-input" type="text" id="new-task-description" name="new-task-description" placeholder="Describe your task" />
                <input className="newtask-date-input" type="date" id="task-deadline" name="task-deadline"/>
                <select className="newtask-prio-dropdown" name="priority" id="priority">
                    <option value="No">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="No">No Prio</option>
                </select>
                <select className="newtask-stage-dropdown" name="stage" id="stage" required>
                    <option name='stage' hidden value='placeholder'>Select a Stage</option>
                    {stages ? stages.filter(stage => stage !== 'Your stage').map(stage => <option key={stage} value={stage}>{stage}</option>) : null}
                </select>
                <input type="submit" value="Add task" id="submit" className="newtask-button" />
            </form>
            <button type='button' className='logout-button' onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default TodoInput;