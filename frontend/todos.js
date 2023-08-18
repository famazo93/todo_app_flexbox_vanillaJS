
const todoField = document.getElementById('container-field');

const todoElement = (id, text, date, prio) => {
    return `<div class="todo added" id="${id}">
    <div class="todo-text">${text}</div>
    <div class="todo-date">${date}</div>
    <div class="todo-prio">${prio}</div>
    <button id="remove-${id}">\u2713</button>
    </div>`
};

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/todo');
    const todos = await response.json();
    return todos;
}

const addTask = async (event) => {
    event.preventDefault();
    const todoText = document.getElementById('new-task').value;
    let todoDate = document.getElementById('task-deadline').value;
    let todoPrio = document.getElementById('priority').value;

    let taskObject = {
        id: new Date().getTime().toString(),
        description: todoText,
        deadline:  todoDate ? todoDate = todoDate : todoDate = 'No Deadline',
        priority: todoPrio ? todoPrio = todoPrio : todoPrio = 'No Prio'
    }

    if (taskObject.description) {
        taskObject.deadline ? taskObject.deadline = taskObject.deadline : taskObject.deadline = 'No Deadline';
        taskObject.priority ? taskObject.priority = taskObject.priority : taskObject.priority = 'No Prio';
        todoField.insertAdjacentHTML("beforeend", todoElement(taskObject.id, taskObject.description, taskObject.deadline, taskObject.priority))
    } else {
        window.alert('Please add a description to your todo!')
    }
    
    let currentTask = document.getElementById(`remove-${taskObject.id}`);
    currentTask.addEventListener('click', removeTask);

    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        mode: "cors",
        cache: "default",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(taskObject)
    });
    return response.json();
}

const fetchedTaskList = await fetchTasks();
const taskList = fetchedTaskList.todo;

console.log(taskList);

const removeTask = async (event) => {
    event.preventDefault();
    const id = event.target.parentElement.id;
    console.log(id);
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
    });
    const toRemove = document.getElementById(id);
    toRemove.remove();
}

const submit = document.getElementById('submit');
submit.addEventListener('click', addTask);

for (let task of taskList) {
    todoField.insertAdjacentHTML("beforeend", todoElement(task.id, task.description, task.deadline, task.priority));
    let currentTask = document.getElementById(`remove-${task.id}`);
    currentTask.addEventListener('click', removeTask);
}

