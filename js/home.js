document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("taskList");

  // خواندن تسک‌ها از localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // مرتب‌سازی تسک‌ها: ابتدا تسک‌های بدون تیک و سپس تسک‌های تیک خورده
  tasks.sort(function (a, b) {
    // اگر task.completed = false باشد، در ابتدا می‌آید
    return a.completed - b.completed;
  });

  // تابع برای رندر تسک‌ها
  function renderTasks() {
    taskList.innerHTML = ""; // پاک کردن لیست قبلی
    tasks.forEach(function (task, index) {
      let listItem = document.createElement("div");
      listItem.classList.add("todo-item");

      let taskLabel = document.createElement("label");
      taskLabel.textContent = task.text; // استفاده از متن تسک

      let taskCheckbox = document.createElement("input");
      taskCheckbox.type = "checkbox";
      taskCheckbox.id = task.text;

      // وضعیت تیک را از localStorage بگیرید و تنظیم کنید
      taskCheckbox.checked = task.completed; // اگر task.completed true بود، تیک زده باشد

      // ایجاد آیکن قلم
      let editIcon = document.createElement("img");
      editIcon.src = "../assets/image/edit.svg";
      editIcon.classList.add("edit-icon");

      // ایجاد آیکن سطل زباله
      let deleteIcon = document.createElement("img");
      deleteIcon.src = "../assets/image/trash.svg"; // مسیر آیکون سطل
      deleteIcon.classList.add("delete-icon");

      // اضافه کردن رویداد حذف
      deleteIcon.addEventListener("click", function () {
        tasks.splice(index, 1); // حذف تسک از آرایه
        localStorage.setItem("tasks", JSON.stringify(tasks)); // ذخیره تغییرات در localStorage
        renderTasks(); // دوباره رندر کردن لیست
      });

      // اضافه کردن انیمیشن CSS به قلم
      editIcon.addEventListener("click", function () {
        // ذخیره اندیس تسک برای ویرایش
        localStorage.setItem("editIndex", index);
        // انتقال به صفحه ویرایش
        window.location.href = "../template/new-task.html";
      });

      let taskCategory = document.createElement("div");
      taskCategory.classList.add("category");
      taskCategory.textContent = "General"; // یا بر اساس دسته‌بندی‌ها می‌توانید تنظیم کنید

      // رویداد چک کردن چک‌باکس
      taskCheckbox.addEventListener("change", function () {
        task.completed = taskCheckbox.checked; // بروزرسانی وضعیت تکمیل
        localStorage.setItem("tasks", JSON.stringify(tasks)); // ذخیره وضعیت جدید
      });

      // اضافه کردن عناصر به لیست
      listItem.appendChild(taskCheckbox);
      listItem.appendChild(taskLabel);
      listItem.appendChild(editIcon);
      listItem.appendChild(deleteIcon);
      listItem.appendChild(taskCategory);
      taskList.appendChild(listItem);
    });
  }

  renderTasks(); // نمایش تسک‌ها در صفحه
});
