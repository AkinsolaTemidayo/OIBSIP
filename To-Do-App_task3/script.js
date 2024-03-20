const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Function to handle task form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = taskInput.value.trim();

  if (taskTitle === "") {
    alert("Please Enter Task");
  } else {
    const listItem = document.createElement("li");
    const taskTime = getCurrentTime();
    listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox"> <!-- Add checkbox -->
            <span class="task-title">${taskTitle}</span>
            <span class="time">${taskTime}</span>
            <span class="edit-icon"><i class="fas fa-edit"></i></span>
            <span class="delete-icon">&times;</span>`;
    listItem.classList.add("task-item");
    taskList.appendChild(listItem);
    taskInput.value = "";
    saveListData();
  }
});

taskList.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("delete-icon")) {
    const li = target.parentElement;
    li.remove();
    saveListData();
  } else if (target.classList.contains("edit-icon")) {
    const editIcon = target;
    const listItem = editIcon.parentElement;
    const taskTitle = listItem.querySelector(".task-title");

    // Convert task title to editable input field
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskTitle.textContent.trim();
    inputField.classList.add("edit-input"); // Add a class to the input field
    taskTitle.replaceWith(inputField);

    // Focus on the input field and select its text
    inputField.focus();
    inputField.select();

    // Handle editing when input field loses focus
    inputField.addEventListener("blur", () => {
      taskTitle.textContent = inputField.value;
      inputField.replaceWith(taskTitle); // Replace input field with task title
      saveListData();
    });

    // Handle editing when "Enter" key is pressed
    inputField.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        taskTitle.textContent = inputField.value;
        inputField.replaceWith(taskTitle); // Replace input field with task title
        saveListData();
      }
    });
  } else if (target.classList.contains("task-title")) {
    const listItem = target.parentElement;
    const taskTitle = listItem.querySelector(".task-title");
    const checkbox = listItem.querySelector(".task-checkbox");

    taskTitle.classList.toggle("checked");
    listItem.classList.toggle("completed"); // Toggle completed class

    // Check the checkbox when the task title is clicked
    checkbox.checked = !checkbox.checked;

    saveListData();
  }
});

// Function to get current time
function getCurrentTime() {
  const now = new Date();
  const hour = addZero(now.getUTCHours() + 1); // West Africa Time (UTC+1)
  const minute = addZero(now.getUTCMinutes());
  return `${hour}:${minute}`;
}

// Function to add leading zero to numbers less than 10
function addZero(number) {
  return number < 10 ? "0" + number : number;
}

// Function to load saved list data
function showListData() {
  taskList.innerHTML = localStorage.getItem("taskListHTML") || "";
}

// Function to save list data to local storage
function saveListData() {
  localStorage.setItem("taskListHTML", taskList.innerHTML);
}

// Load saved list data when the page loads
showListData();

const d = new Date();
document.getElementById("demo").innerHTML =
  "Developed By " +
  "" +
  "Akinsola Temidayo " +
  "&copy" +
  " " +
  d.getFullYear() +
  "";

// Function to handle editing when "Enter" key is pressed in the input field
taskList.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const target = event.target;
    if (target.classList.contains("edit-input")) {
      const listItem = target.parentElement;
      const taskTitle = listItem.querySelector(".task-title");
      taskTitle.textContent = target.value;
      target.replaceWith(taskTitle); // Replace input field with task title
      saveListData();
    }
  }
});
