// Array for the tasks
var tasks = [];
var uniqueId = 1;

// This is for the form submit event
document.getElementById("task-form").onsubmit = function (event) {
  event.preventDefault();

  // Reading input values here
  var title = document.getElementById("task-title").value.trim();
  var priority = document.getElementById("task-priority").value;
  var statusInput = document.getElementsByName("task-status");
  var status = "pending";

  if (title === "") {
    alert("Please enter a valid title.");
    return;
  }

  // finding out which status button is checked and setting the status for that task
  for (var i = 0; i < statusInput.length; i++) {
    if (statusInput[i].checked) {
      status = statusInput[i].value;
      break;
    }
  }

  // Create task object and then add to array
  var task = { id: uniqueId, title: title, priority: priority, status: status };
  uniqueId++;
  tasks.push(task);

  // Call the function to add tasks to DOM
  addToDOM(task);

  // Update task count
  document.getElementById("task-count").textContent = tasks.length;

  // Finally, reset the form to the original state
  document.getElementById("task-form").reset();
};

// Build and append a task item to the list
function addToDOM(task) {
  var li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.setAttribute("data-id", task.id);

  // Task info display in the browser
  var span = document.createElement("span");
  span.textContent = task.title + " [" + task.priority.charAt(0).toUpperCase() + task.priority.slice(1) + " Priority] - " + task.status;
  if (task.status === "completed") {
    span.style.textDecoration = "line-through";
    span.style.color = "#999";
  }

  if (task.priority === "low") {
    li.style.backgroundColor = "#d4ede8ff";
} else if (task.priority === "medium") {
    li.style.backgroundColor = "#ffe5b4";
} else if (task.priority === "high") {
    li.style.backgroundColor = "#f8d7da";
}

  // Buttons
  var buttonGroup = document.createElement("div");

  var completeButton = document.createElement("button");
  completeButton.textContent = "Mark Complete";
  completeButton.className = "btn btn-success btn-sm me-2";
  completeButton.onclick = function () {
    markComplete(task.id, span, completeButton);
  };

  var removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "btn btn-danger btn-sm";
  removeButton.onclick = function () {
    removeTask(task.id, li);
  };

  buttonGroup.appendChild(completeButton);
  buttonGroup.appendChild(removeButton);

  li.appendChild(span);
  li.appendChild(buttonGroup);

  document.getElementById("task-list").appendChild(li);
}

// Mark task as complete
function markComplete(id, span, button) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].status = "completed";
      break;
    }
  }

  span.style.textDecoration = "line-through";
  span.style.color = "#999";
  button.disabled = true;
}

// Remove a task
function removeTask(id, li) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }

  li.remove();
  document.getElementById("task-count").textContent = tasks.length;
}
