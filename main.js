
const todoField = document.getElementById('container-field');
let taskCounter = 0;


const todoElement = (text, date, prio) => {
    return `<div class="todo added" id="task-${taskCounter}">
                <div class="todo-text">${text}</div>
                <div class="todo-date">${date}</div>
                <div class="todo-prio">${prio}</div>
                <button id="remove-${taskCounter}">X</button>
            </div>`
};

const submitTask = (event) => {
    taskCounter++;
    event.preventDefault();
    const todoText = document.getElementById('new-task').value;
    let todoDate = document.getElementById('task-deadline').value;
    let todoPrio = document.getElementById('priority').value;

    if (todoText) {
        todoDate ? todoDate = todoDate : todoDate = 'No Deadline';
        todoPrio ? todoPrio = todoPrio : todoPrio = 'No Prio';
        todoField.insertAdjacentHTML("beforeend", todoElement(todoText, todoDate, todoPrio))
    } else {
        window.alert('Please add a description to your todo!')
    }

    let currentTask = document.getElementById(`remove-${taskCounter}`);
    currentTask.addEventListener('click', removeTask);
};

const removeTask = (event) => {
    const id = event.target.parentElement.id;
    event.preventDefault();
    const toRemove = document.getElementById(id);
    toRemove.remove();
}

const submit = document.getElementById('submit');
submit.addEventListener('click', submitTask);

// this is only here for the test task
const remove = document.getElementById('remove');
remove.addEventListener('click', removeTask);