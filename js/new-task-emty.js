function saveText() {
  let input = document.getElementById("text").value.trim();
  let savedTexts = document.getElementById("saveTexts");

  if (input === "") {
    alert("input field cannot be empty");
  } else {
    let listItem = document.createElement("li");
    listItem.textContent = input;
    saveTexts.appendChild(listItem);
    document.getElementById("text").value = "";
  }
}
