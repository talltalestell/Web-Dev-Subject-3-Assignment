// Insert Advanced Code 01 here...

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

//Function to save TODOs to localStorage
function saveTodosToLocalStorage(todos) {
    localStorage.setItem("todos",JSON.stringify(todos));
}

// Insert Advanced Code 02 here...

// Function to add a TODO via API & localStorage
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        showMessage("Please enter a valid TODO!", true);
        return;
    }

    const newTodo = { text: todoText, completed: false };

    // Save to localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(newTodo);
    saveTodosToLocalStorage(todos);

    // Mock API request
    setLoading(true);
    setTimeout(() => {
        renderTodo(newTodo);
        todoInput.value= "";
        showMessage("TODO added successfully!");
        setLoading(false);
    }, 1000);
}

// Function to render a TODO item
function renderTodo(todo) {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", () => togglecomplete(todo.text, li));
    todoList.appendChild(li);
}


// Insert Advanced Code 03 here...

// Function to toggle TODO copmletion and update localStorage
function toggleComplete(todoText, li) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todo.map(todo => {
        if (todo.text === todoText) {
            todo.completed !=todo.completed;
        }
        return todo;
    });

    saveTodosToLocalStorage(todos);
    li.classList.toggle("completed");
}

// Function to clear completed TODOs
function clearCompleted() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => !todo.completed);
    saveTodosToLocalStorage(todos);

    // Remove completed items from UI
    document.querySelectorAll(".completed").forEach(todo => todo.remove());
    showMessage("Completed TODOs Cleared!");
}

// Event listeners
addTodoButton.addEventListener("click", addTodo);
clearCompletedButton.addEventListener("click", clearCompleted);
todoInput.addEventListener("keypress", function (event) {
    if (event.key === "event") {
        addTodo();
    }
});
