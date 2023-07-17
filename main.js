
const todoField = document.getElementById('container-field');

// i will need to read the local storage here to initialize the right tasks
let rawTaskList = localStorage.getItem('tasks');
let taskList = JSON.parse(rawTaskList) ? JSON.parse(rawTaskList) : [];

const todoElement = (id, text, date, prio) => {
    return `<div class="todo added" id="${id}">
    <div class="todo-text">${text}</div>
    <div class="todo-date">${date}</div>
    <div class="todo-prio">${prio}</div>
    <button id="remove-${id}">\u2713</button>
    </div>`
};

const submitTask = (event) => {
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
    
    taskList.push(taskObject);
    
    let tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', `${tasksJSON}`);
};

const removeTask = (event) => {
    event.preventDefault();
    const id = event.target.parentElement.id;

    let indexToRemove = 0;
    for (task of taskList) {
        console.log(`Looking for: ${id}.`);
        console.log(`Looking at: ${task.id}`)
        if (task.id === id) {
            indexToRemove = taskList.indexOf(task);
            console.log(indexToRemove);
        };
    }
    
    taskList.splice(indexToRemove, 1);
    console.log(taskList);
    let newTasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', `${newTasksJSON}`);

    const toRemove = document.getElementById(id);
    toRemove.remove();
    console.log(localStorage.getItem('tasks'));
}

const submit = document.getElementById('submit');
submit.addEventListener('click', submitTask);

for (let task of taskList) {
    todoField.insertAdjacentHTML("beforeend", todoElement(task.id, task.description, task.deadline, task.priority));
    let currentTask = document.getElementById(`remove-${task.id}`);
    currentTask.addEventListener('click', removeTask);
}

