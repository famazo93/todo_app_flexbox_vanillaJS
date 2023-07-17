
const todoField = document.getElementById('container-field');
let taskCounter = 0;

// i will need to read the local storage here to initialize the right tasks
let rawTaskList = localStorage.getItem('tasks');
let taskList = JSON.parse(rawTaskList) ? JSON.parse(rawTaskList) : [];

const todoElement = (text, date, prio) => {
    return `<div class="todo added" id="task-${taskCounter}">
    <div class="todo-text">${text}</div>
    <div class="todo-date">${date}</div>
    <div class="todo-prio">${prio}</div>
    <button id="remove-${taskCounter}">\u2713</button>
    </div>`
};

const submitTask = (event) => {
    taskCounter++;
    event.preventDefault();
    const todoText = document.getElementById('new-task').value;
    let todoDate = document.getElementById('task-deadline').value;
    let todoPrio = document.getElementById('priority').value;
    
    let taskObject = {
        id: taskCounter,
        description: todoText,
        deadline:  todoDate ? todoDate = todoDate : todoDate = 'No Deadline',
        priority: todoPrio ? todoPrio = todoPrio : todoPrio = 'No Prio'
    }
    
    if (taskObject.description) {
        taskObject.deadline ? taskObject.deadline = taskObject.deadline : taskObject.deadline = 'No Deadline';
        taskObject.priority ? taskObject.priority = taskObject.priority : taskObject.priority = 'No Prio';
        todoField.insertAdjacentHTML("beforeend", todoElement(taskObject.description, taskObject.deadline, taskObject.priority))
    } else {
        window.alert('Please add a description to your todo!')
    }
    
    let currentTask = document.getElementById(`remove-${taskCounter}`);
    currentTask.addEventListener('click', removeTask);
    
    taskList.push(taskObject);
    
    let tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', `${tasksJSON}`);
};

const removeTask = (event) => {
    const id = event.target.parentElement.id;
    event.preventDefault();
    const toRemove = document.getElementById(id);
    toRemove.remove();

    // need to update taskList and localStorage
}

const submit = document.getElementById('submit');
submit.addEventListener('click', submitTask);

for (let task of taskList) {
    taskCounter++;
    todoField.insertAdjacentHTML("beforeend", todoElement(task.description, task.deadline, task.priority));
    let currentTask = document.getElementById(`remove-${taskCounter}`);
    currentTask.addEventListener('click', removeTask);
}