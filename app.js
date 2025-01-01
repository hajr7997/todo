// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
window.addEventListener('load', loadTasks);

// Add task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = createTaskElement(taskText);
    taskList.appendChild(task);
    saveTasks();
    taskInput.value = '';
});


// Create task element
function createTaskElement(taskText) {
    const task = document.createElement('li');
    task.className = 'task';

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    // Mark task as completed
    taskContent.addEventListener('click', () => {
        task.classList.toggle('completed');
        saveTasks();
    });

    // Delete task
    deleteBtn.addEventListener('click', () => {
        task.remove();
        saveTasks();
    });

    task.appendChild(taskContent);
    task.appendChild(deleteBtn);
    return task;
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        const task = createTaskElement(taskData.text);
        if (taskData.completed) task.classList.add('completed');
        taskList.appendChild(task);
    });
}

// Edit task
taskContent.addEventListener('dblclick', () => {
    const newTaskText = prompt("Edit task:", taskContent.textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskContent.textContent = newTaskText.trim();
        saveTasks();
    }
});


