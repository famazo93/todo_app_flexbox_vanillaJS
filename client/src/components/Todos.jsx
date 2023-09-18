import Todo from './Todos';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

function Todos() {
    const [todos, setTodos] = useState(null);
    const [user, setUser] = useState(Cookies.get('user'));

    useEffect(() => {
        const getTodos = async() => {
            const response = await fetch(`http://localhost:3000/todo/${user}`);
            const todos = await response.json();
            setTodos(todos);
        }

        getTodos();
    }, [user]);

    return <div>Todos</div>
}

export default Todos;