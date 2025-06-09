$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let $taskList = $("#taskList");

  if ($taskList.length) {
    function renderTasks() {
      tasks.sort((a, b) => a.completed - b.completed);
      $taskList.empty();

      tasks.forEach(function (task) {
        let $listItem = $("<div>").addClass("todo-item");
        let $taskCheckbox = $("<input>")
          .attr("type", "checkbox")
          .prop("checked", task.completed);

        let $taskLabel = $("<label>").text(task.text);
        let $editIcon = $("<img>")
          .attr("src", "../assets/image/edit.svg")
          .addClass("edit-icon");
        let $deleteIcon = $("<img>")
          .attr("src", "../assets/image/trash.svg")
          .addClass("delete-icon");
        let $taskCategory = $("<div>").addClass("category").text("General");

        $deleteIcon.on("click", function () {
          tasks = tasks.filter((t) => t.id !== task.id);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderTasks();
        });

        $editIcon.on("click", function () {
          window.location.href = `new-task.html?id=${task.id}`;
        });

        $taskCheckbox.on("change", function () {
          let targetTask = tasks.find((t) => t.id === task.id);
          if (targetTask) {
            targetTask.completed = $(this).prop("checked");
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
          }
        });

        $listItem.append(
          $taskCheckbox,
          $taskLabel,
          $editIcon,
          $deleteIcon,
          $taskCategory
        );

        $taskList.append($listItem);
      });
    }

    renderTasks();
  }
});
