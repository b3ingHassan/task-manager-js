const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

function UpdateMessage() {
    const taskLength = tasks.children.length;
    messageSpan.textContent = `You have ${taskLength} pending tasks.`;
}
UpdateMessage();

addForm.addEventListener("submit", event => {
    event.preventDefault();
    const value = addForm.task.value.trim();
    if (value.length) {
        tasks.innerHTML += `<li><span>${value}</span><i class="bi bi-trash-fill delete"></i></li>`
        addForm.reset();
        UpdateMessage();
    }
});

tasks.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        UpdateMessage();
    }
});

clearAll.addEventListener("click", event => {
    const taskItems = document.querySelectorAll("li");
    taskItems.forEach(item => {
        item.remove();
        UpdateMessage();
    });
});

function filterTask(term) {
    Array.from(tasks.children).filter(task => {
        return !task.textContent.toLowerCase().includes(term);
    }).forEach(task => {
        task.classList.add("hide");
    });

    Array.from(tasks.children).filter(task => {
        return task.textContent.toLowerCase().includes(term);

    }).
        forEach(task => {
            task.classList.remove("hide");
        });

};
searchForm.addEventListener("keyup", event => {
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term);
    console.log(term);

});

searchForm.addEventListener("click", event => {
    if (event.target.classList.contains("reset")) {
        searchForm.reset();
        const term = searchForm.task.value.trim().toLowerCase();
        filterTask(term);

    }
});