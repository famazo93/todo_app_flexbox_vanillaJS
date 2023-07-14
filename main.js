
const todoField = document.getElementById('container-field');


const todoElement = (text, date, prio) => {
    return `<div class="todo added">
                <div class="todo-text">${text}</div>
                <div class="todo-date">${date}</div>
                <div class="todo-prio">${prio}</div>
                <button id="remove">X</button>
            </div>`
};

const submitTask = (event) => {
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

}

const submit = document.getElementById('submit');
submit.addEventListener('click', submitTask);