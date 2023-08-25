document.addEventListener("DOMContentLoaded", function () {
    let addToDoButton = document.getElementById('addToDo');
    let inputField = document.getElementById('inputField');
    let toDoItem = document.getElementById('toDoItem');

    // Load to-do items from local storage when the page loads
    loadToDoItems();

    addToDoButton.addEventListener('click', function () {
        const taskText = inputField.value.trim();
        if (taskText !== "") {
            const existingTasks = toDoItem.querySelectorAll(".itemToDo").length;

            if (existingTasks < 8) {
                const taskItemHTML = `
                    <div class="itemToDo">
                        <span class="toDoText">${taskText}</span>
                        <button class="delete"><img src="images/trash-solid.png"></button>
                        <button class="check"><img src="images/check-solid.png"></button>
                    </div>
                `;

                toDoItem.innerHTML += taskItemHTML;
                inputField.value = "";

                saveToDoItems();
                attachButtonListeners();
            } else {
                alert("You can only have up to 8 items in your list at once.");
            }
        }
    });

    function saveToDoItems() {
        const taskItems = document.querySelectorAll(".itemToDo");
        const tasks = [];

        taskItems.forEach(taskItem => {
            const taskText = taskItem.querySelector(".toDoText").textContent;
            const isTaskChecked = taskItem.querySelector(".check").classList.contains("checked-button");

            tasks.push({ text: taskText, checked: isTaskChecked });
        });

        localStorage.setItem("toDoItems", JSON.stringify(tasks));
    }

    function loadToDoItems() {
        const savedTasks = JSON.parse(localStorage.getItem("toDoItems"));

        if (savedTasks) {
            savedTasks.forEach(task => {
                const taskItemHTML = `
                    <div class="itemToDo">
                        <span class="toDoText">${task.text}</span>
                        <button class="delete"><img src="images/trash-solid.png"></button>
                        <button class="check"><img src="images/check-solid.png"></button>
                    </div>
                `;

                toDoItem.innerHTML += taskItemHTML;

                const lastTaskItem = toDoItem.querySelector(".itemToDo:last-child");
                if (task.checked) {
                    lastTaskItem.querySelector(".toDoText").classList.add("checked-text");
                    lastTaskItem.querySelector(".check").classList.add("checked-button");
                }
            });

            attachButtonListeners();
        }
    }

    function attachButtonListeners() {
        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener("click", function () {
                this.parentNode.remove();
                saveToDoItems();
            });
        });

        const checkButtons = document.querySelectorAll(".check");
        checkButtons.forEach(checkButton => {
            checkButton.addEventListener("click", function () {
                const taskTextSpan = this.parentNode.querySelector(".toDoText");

                if (!taskTextSpan.classList.contains("checked-text")) {
                    taskTextSpan.classList.add("checked-text");
                    this.classList.add("checked-button");
                } else {
                    taskTextSpan.classList.remove("checked-text");
                    this.classList.remove("checked-button");
                }
                saveToDoItems();
            });
        });
    }
});
