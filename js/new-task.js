document.addEventListener("DOMContentLoaded", function () {
  let taskInput = document.getElementById("taskInput");
  let saveTaskButton = document.getElementById("saveTaskButton");
  let taskList = document.getElementById("taskList");

  function saveTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Input cannot be empty");
      return;
    }

    let listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.justifyContent = "space-between";
    listItem.style.alignItems = "center";
    listItem.style.padding = "8px";
    listItem.style.borderBottom = "1px solid #ccc";

   
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    let trashIcon = document.createElement("span");
    trashIcon.innerHTML = "🗑️";
    trashIcon.classList.add("trash-icon");
    trashIcon.style.cursor = "pointer";
    trashIcon.style.marginLeft = "10px";
    trashIcon.title = "Delete task";

   
    trashIcon.addEventListener("click", function () {
      taskList.removeChild(listItem);
    });

 
    listItem.appendChild(taskSpan);
    listItem.appendChild(trashIcon);

    taskList.appendChild(listItem);
    taskInput.value = "";
  }

  saveTaskButton.addEventListener("click", saveTask);

  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveTask();
    }
  });
});
