document.addEventListener("DOMContentLoaded", function () {
  let taskInput = document.getElementById("taskInput");
  let saveTaskButton = document.getElementById("saveTaskButton");

  let editIndexRaw = localStorage.getItem("editIndex");
  let editIndex = null;

  console.log("Raw editIndex from localStorage:", editIndexRaw);

  if (editIndexRaw !== null) {
    editIndex = parseInt(editIndexRaw, 10);
    console.log("Parsed editIndex:", editIndex);

    if (!isNaN(editIndex)) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      if (tasks[editIndex]) {
        taskInput.value = tasks[editIndex].text;
      } else {
        console.warn("No task at this index");
      }
    } else {
      console.warn("editIndex is not a valid number");
    }
  }

  saveTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Task cannot be empty");
      return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (editIndex !== null && !isNaN(editIndex)) {
      // ویرایش تسک
      if (tasks[editIndex]) {
        tasks[editIndex].text = taskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.removeItem("editIndex");
      } else {
        alert("Task not found for editing.");
        return;
      }
    } else {
      // اضافه کردن تسک جدید
      let newTask = {
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    taskInput.value = "";
    alert("Changes saved successfully!");
    window.location.href = "../template/home.html";
  });

  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveTaskButton.click();
    }
  });
});
