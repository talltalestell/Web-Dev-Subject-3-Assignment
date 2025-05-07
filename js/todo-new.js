const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const clearCompletedButton = document.getElementById("clear-completed");
const todoList = document.getElementById("todo-list");
const statusMessage = document.getElementById("status-message");
const loadingIndicator = document.getElementById("loading");

// Load Saved TODOs from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTodos);

// Function to display messages
function showMessage(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? "red" : "green";
    setTimeout(() => { statusMessage.textContent = ""; }, 3000);
}

// Function to show/hide loading indicator
function setLoading(isLoading) {
    loadingIndicator.style.display = isLoading ? "block" : "none";
}

// Function to load TODOs from localStorage
function loadTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(renderTodo);
}

// Function to save TODOs to localStorage
function saveTodosToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to add a TODO via API & localStorage
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        showMessage("Please enter a valid TODO!", true);
        return;
    }

    const newTodo = { 
        text: todoText, 
        completed: false, 
        timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short',hour12: false}) // Store the current time as a timestamp
    };

    // Save to localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(newTodo);
    saveTodosToLocalStorage(todos);

    // Mock API request
    setLoading(true);
    setTimeout(() => {
        renderTodo(newTodo);
        todoInput.value = "";
        showMessage("TODO added successfully!");
        setLoading(false);
    }, 1000);
}

// Function to render a TODO item in a table row
function renderTodo(todo) {
    const row = document.createElement("tr");

    // Create table cells for todo text, checkbox, and timestamp
    const textCell = document.createElement("td");
    textCell.textContent = todo.text;

    const checkboxCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleComplete(todo.text, row, checkbox));

    checkboxCell.appendChild(checkbox);

    const timestampCell = document.createElement("td");
    timestampCell.textContent = todo.timestamp;

    // Center the checkbox and time cells so that they look sleek like a Mercedes
    checkboxCell.classList.add("d-flex"); // I ended up fixing it by applying a style to the checkbox element. And hey, there is nothing as permanent as a temporary solution
    timestampCell.classList.add("text-center");


    // Append cells to the row
    row.appendChild(textCell);
    row.appendChild(timestampCell);
    row.appendChild(checkboxCell);

    // Apply styles if the todo is completed
    if (todo.completed) {
        row.classList.add("completed");
        checkbox.checked = true; // Ensure the checkbox is checked if completed
    }

    // Add the row to the table
    todoList.appendChild(row);
}

// Function to toggle TODO completion and update localStorage
function toggleComplete(todoText, row, checkbox) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.map(todo => {
        if (todo.text === todoText) {
            todo.completed = checkbox.checked; // Update the completed status based on checkbox
        }
        return todo;
    });

    saveTodosToLocalStorage(todos);

    // Apply or remove the completed styles when checkbox is toggled
    if (checkbox.checked) {
        row.classList.add("completed");
    } else {
        row.classList.remove("completed");
    }
}

// Function to clear completed TODOs
function clearCompleted() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => !todo.completed);
    saveTodosToLocalStorage(todos);

    // Remove completed items from UI
    document.querySelectorAll(".completed").forEach(row => row.remove());
    showMessage("Completed TODOs Cleared!");
}

// Event listeners
addTodoButton.addEventListener("click", addTodo);
clearCompletedButton.addEventListener("click", clearCompleted);
todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});
