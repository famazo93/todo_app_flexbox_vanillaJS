
const todoField = document.getElementById('container-field');


const todoElement = (text, date, prio) => {
    return `<div class="todo">
                <div>${text}</div>
                <div>${date}</div>
                <div>${prio}</div>
            </div>`
};

const submitTask = (event) => {
    event.preventDefault();
    const todoText = document.getElementById('new-task').value;
    const todoDate = document.getElementById('task-deadline').value;
    const todoPrio = document.getElementById('priority').value;
    todoField.insertAdjacentHTML("beforeend", todoElement(todoText, todoDate, todoPrio))

}

const submit = document.getElementById('submit');
submit.addEventListener('click', submitTask);