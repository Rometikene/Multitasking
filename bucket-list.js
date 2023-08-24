document.addEventListener("DOMContentLoaded", function (){
let addToDoButton = document.getElementById('addToDo');
let inputField = document.getElementById('inputField');
let toDoItem = document.getElementById('toDoItem');

addToDoButton.addEventListener('click', function(){
    const taskText = inputField.value.trim();
    if (taskText !== "") {
        const existingTasks = toDoItem.querySelectorAll("div").length;

        if (existingTasks < 10) {
        const taskItemHTML = `
        <div class="itemToDo">
            <span class="toDoText">${taskText}</span>
            <button class="delete"><img src="images/trash-solid.png"></button>
            <button class="check"><img src="images/check-solid.png"></button>
        </div>
        `;

        toDoItem.innerHTML += taskItemHTML;
        inputField.value= "";

        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener("click", function() {
                this.parentNode.remove();
            });
        });
        const checkButtons = document.querySelectorAll(".check");
        checkButtons.forEach(checkButton => {
            checkButton.addEventListener("click", function () {
                const taskTextSpan = this.parentNode.querySelector("span");

                if (!taskTextSpan.classList.contains("checked-text")) {
                    taskTextSpan.classList.add("checked-text");
                    this.classList.add("checked-button");
                } else {
                    taskTextSpan.classList.remove("checked-text");
                    this.classList.remove("checked-button");
                }
            });
        });
    } else {
        alert("You can only have up to 10 items at once.")
    }
    }
});
});