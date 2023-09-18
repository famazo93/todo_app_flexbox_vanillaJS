import Todo from './Todos';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

function Todos() {
    const [todos, setTodos] = useState(null);
    const [user, setUser] = useState(Cookies.get('user'));

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`http://localhost:3000/todo/${user}`);
            const data = await response.json();
            setTodos(data);
        }

        getTodos();
    }, [user]);

    console.log(todos);
    return todos ? (
        <div className="container" id="container-field">
            <div className="todo" id="add-todo">
                <div className="title">What do you want to accomplish next?</div>
                <form id="input-form">
                    <input className="form-control" type="text" id="new-task" name="new-task" placeholder="Describe your new task" />
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <input className="form-control form-control-sm" type="date" id="task-deadline" name="task-deadline" />
                        </div>
                        <div className="col-auto">
                            <select className="form-select form-select-sm m-2 dropdown" name="priority" id="priority">
                                <option value="Prio: High">High</option>
                                <option value="Prio: Medium">Medium</option>
                                <option value="Prio: Low">Low</option>
                                <option value="Prio: No Prio">No Prio</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <input type="submit" value="Add task" id="submit" className="btn btn-warning btn-sm ms-3" />
                        </div>
                    </div>
                </form>
            </div>
            {todos.map(todo => {
                return <Todo key={todo.id} todo={todo} />
                })
            }
        </div>
    ) : <div>Loading...</div>
}

export default Todos;