import Cookies from 'js-cookie';

function TodoInput() {
    const handleSubmit = async (event) => {
        const description = event.target['new-task'].value;
        const deadline = event.target['task-deadline'].value;
        const priority = event.target.priority.value;
        const user = Cookies.get('user');
        
        const newTask = {
            description,
            deadline,
            priority
        };

        await fetch(`http://localhost:3000/todos/${user}`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-type": "application/json"
            }
        })

    }

    return (
        <div className="todo" id="add-todo">
            <div className="title">What do you want to accomplish next?</div>
            <form id="input-form" action="" onSubmit={handleSubmit}>
                <input className="newtask-description-input" type="text" id="new-task" name="new-task" placeholder="Describe your new task" />
                <input className="newtask-date-input" type="date" id="task-deadline" name="task-deadline" />
                <select className="newtask-prio-dropdown" name="priority" id="priority">
                    <option value="Prio: High">High</option>
                    <option value="Prio: Medium">Medium</option>
                    <option value="Prio: Low">Low</option>
                    <option value="Prio: No Prio">No Prio</option>
                </select>
                <input type="submit" value="Add task" id="submit" className="newtask-button" />
            </form>
        </div>
    )
}

export default TodoInput;