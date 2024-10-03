const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const userNameInput = document.getElementById('userName');
const displayName = document.getElementById('displayName');
const toggleModeBtn = document.getElementById('toggleMode');
const showPendingBtn = document.getElementById('showPendingBtn');
const showCompletedBtn = document.getElementById('showCompletedBtn');

let tasks = [];
let isDarkMode = false;
let showCompletedTasks = false;

userNameInput.addEventListener('input', () => {
    displayName.textContent = userNameInput.value || 'User';
});

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const task = {
        text: taskText,
        completed: false,
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = showCompletedTasks 
        ? tasks.filter(task => task.completed) 
        : tasks.filter(task => !task.completed);

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.textContent = task.text;

        const buttonGroup = document.createElement('div');
        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-success btn-sm';
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleTaskCompletion(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm ml-2';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);

        buttonGroup.appendChild(completeBtn);
        buttonGroup.appendChild(deleteBtn);
        listItem.appendChild(buttonGroup);
        taskList.appendChild(listItem);
    });
    updateProgressBar();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateProgressBar() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = progress + '%';
    progressBar.textContent = Math.round(progress) + '%';
}

toggleModeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    toggleModeBtn.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

showPendingBtn.addEventListener('click', () => {
    showCompletedTasks = false;
    renderTasks();
});

showCompletedBtn.addEventListener('click', () => {
    showCompletedTasks = true;
    renderTasks();
});
