const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const priorityInput = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

// this is basically saying, getting the saved text and turning it into a list or if nothing was saved yet, start with an empty list
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// this turns the list into text/string(because local storage only stores text) and saves it under 'tasks'
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = ""; //empty the task list

  tasks.forEach(function (task, index) {
    const item = document.createElement("div");  // create a new div for this task
    item.className = "task-item " + task.priority; //add the card class (from the css) and the priority class
    
    //if its marked as completed, add the completed class to it so it can be styled differently
    if (task.completed) { 
      item.classList.add("completed");
    }
    
    // build the inside of the task card as one HTML string 
    item.innerHTML =
    "<span></span>" +
    '<div class="task-actions">' +
    '<button class="toggle-btn" data-index="' + index + '">' +
    (task.completed ? "Undo" : "Completed") +
    "</button>" +
    '<button class="delete-btn" data-index="' + index + '">Delete</button>' +
    "</div>";

    // put the title in the span as plain text
    item.querySelector("span").textContent = task.title;

    // add the finished task card to the list on the page
    taskList.appendChild(item);
  });
}

// Add a task when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  tasks.push({
    title: titleInput.value,
    priority: priorityInput.value,
    completed: false,
  });

  saveTasks();
  renderTasks();
  form.reset();
});

// Deal with the done and delete clicks
taskList.addEventListener("click", function (event) {
  const index = event.target.dataset.index;
  if (index === undefined) return;

  if (event.target.classList.contains("toggle-btn")) {
    tasks[index].completed = !tasks[index].completed;
  }
  if (event.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
  }

  saveTasks();
  renderTasks();
});

// Show saved tasks when the page loads
renderTasks();