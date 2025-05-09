document.addEventListener("DOMContentLoaded", function () {
  let taskInput = document.getElementById("taskInput");
  let saveTaskButton = document.getElementById("saveTaskButton");

  // بررسی وجود تسک برای ویرایش
  let editIndex = localStorage.getItem("editIndex");
  if (editIndex !== null) {
    // دریافت تسک از localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskInput.value = tasks[editIndex].text; // نمایش تسک برای ویرایش
  }

  saveTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Task cannot be empty");
      return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (editIndex !== null) {
      // ویرایش تسک
      tasks[editIndex].text = taskText; // ویرایش متن تسک
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // حذف ایندکس ویرایش
      localStorage.removeItem("editIndex");
    } else {
      // اضافه کردن تسک جدید
      let newTask = {
        text: taskText,
        completed: false, // وضعیت اولیه تیک
      };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    taskInput.value = ""; // پاک کردن فیلد ورودی
    alert("Changes saved successfully!"); // پیام تغییرات ذخیره شده
    window.location.href = "../template/home.html"; // برگشت به صفحه اصلی
  });

  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveTaskButton.click();
    }
  });
});
