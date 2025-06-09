$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const editId = Number(params.get("id"));

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let $taskInput = $("#taskInput");
  let $saveTaskButton = $("#saveTaskButton");

  if (editId) {
    let taskToEdit = tasks.find((task) => task.id === editId);
    if (taskToEdit) {
      $taskInput.val(taskToEdit.text);
    }
  }

  $saveTaskButton.on("click", function () {
    const taskText = $taskInput.val().trim();
    if (taskText === "") {
      alert("Task cannot be empty");
      return;
    }

    if (editId) {
      let taskToEdit = tasks.find((task) => task.id === editId);
      if (taskToEdit) {
        taskToEdit.text = taskText;
      }
    } else {
      let newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    $taskInput.val("");
    alert("Changes saved successfully!");
    window.location.href = "home.html";
  });

  $taskInput.on("keydown", function (event) {
    if (event.key === "Enter") {
      $saveTaskButton.click();
    }
  });
});
