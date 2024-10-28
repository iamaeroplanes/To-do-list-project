// Select the input field, button, and task list
const inputTask = document.getElementById('input-task');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Fetch tasks from localStorage or initialize an empty array if no tasks exist
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks on the page
function renderTasks() {
    taskList.innerHTML = ''; // Clear current tasks

    tasks.forEach((task, index) => {
        // Create new <li> element for each task
        const newTask = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        // Create span element for the task name
        const taskSpan = document.createElement('span');
        taskSpan.classList.add('task');
        taskSpan.textContent = task.name;

        // Mark task as completed if it is
        if (task.completed) {
            taskSpan.style.textDecoration = 'line-through';
        }

        // Add event listener to toggle task completion
        checkbox.addEventListener('change', function () {
            task.completed = checkbox.checked;
            toggleTaskCompletion(checkbox, taskSpan);
            saveTasks(); // Save updated task list
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'X';

        // Add event listener to delete task when the delete button is clicked
        deleteButton.addEventListener('click', function () {
            tasks.splice(index, 1); // Remove task from array
            saveTasks(); // Save updated task list
            renderTasks(); // Re-render tasks
        });

        // Append checkbox, task name, and delete button to the new <li> element
        newTask.appendChild(checkbox);
        newTask.appendChild(taskSpan);
        newTask.appendChild(deleteButton);

        // Add the new task to the task list
        taskList.appendChild(newTask);
    });
}

// Function to mark/unmark a task as complete
function toggleTaskCompletion(checkbox, taskSpan) {
    if (checkbox.checked) {
        taskSpan.style.textDecoration = 'line-through';
    } else {
        taskSpan.style.textDecoration = 'none';
    }
}

// Function to add a new task
function addTask() {
    // Get the value from the input field
    const taskName = inputTask.value.trim();

    // Ensure task has a name
    if (taskName !== '') {
        // Create a task object
        const task = {
            name: taskName,
            completed: false
        };

        // Add task to the tasks array
        tasks.push(task);

        // Save the updated tasks list to localStorage
        saveTasks();

        // Re-render the tasks
        renderTasks();

        // Clear the input field for the next task
        inputTask.value = '';
    } else {
        alert('Please enter a task name.');
    }
}

// Add event listener to the "Add" button
addTaskButton.addEventListener('click', addTask);

// Optional: Add task by pressing "Enter" key
inputTask.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial rendering of tasks from localStorage
renderTasks();
