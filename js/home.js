document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.sort(function (a, b) {
    return a.completed - b.completed;
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
      let listItem = document.createElement("div");
      listItem.classList.add("todo-item");

      let taskLabel = document.createElement("label");
      taskLabel.textContent = task.text;

      let taskCheckbox = document.createElement("input");
      taskCheckbox.type = "checkbox";
      taskCheckbox.id = task.text;

      taskCheckbox.checked = task.completed;

      let editIcon = document.createElement("img");
      editIcon.src = "../assets/image/edit.svg";
      editIcon.classList.add("edit-icon");

      let deleteIcon = document.createElement("img");
      deleteIcon.src = "../assets/image/trash.svg";
      deleteIcon.classList.add("delete-icon");

      deleteIcon.addEventListener("click", function () {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      editIcon.addEventListener("click", function () {
        localStorage.setItem("editIndex", index);

        window.location.href = "../template/new-task.html";
      });

      let taskCategory = document.createElement("div");
      taskCategory.classList.add("category");
      taskCategory.textContent = "General";

      taskCheckbox.addEventListener("change", function () {
        task.completed = taskCheckbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });

      listItem.appendChild(taskCheckbox);
      listItem.appendChild(taskLabel);
      listItem.appendChild(editIcon);
      listItem.appendChild(deleteIcon);
      listItem.appendChild(taskCategory);
      taskList.appendChild(listItem);
    });
  }

  renderTasks();
});
