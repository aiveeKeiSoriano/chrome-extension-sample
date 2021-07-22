const closeButtons = document.querySelectorAll(".close")
const inputField = document.getElementById("input-field")
const addButton = document.querySelector(".add")
const taskList = document.querySelector(".list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

if (tasks) {
    tasks.forEach(el => makeTask(el.name, el.id))
}

function closeTask(e) {
    let newList = tasks.filter(el => {
        console.log(e.target.parentNode.id, el.id)
        return e.target.parentNode.id !== el.id
    })
    console.log("newList", newList)
    localStorage.setItem("tasks", JSON.stringify(newList))
    taskList.removeChild(e.target.parentNode)
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

addButton.addEventListener("click", addTask)

function addTask() {
    if (!inputField.value) return
    let taskID = Date.now().toString()
    localStorage.setItem("tasks", JSON.stringify([...tasks, { name: inputField.value, id: taskID }]))
    makeTask(inputField.value, taskID)
    inputField.value = ""
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

function makeTask(task, id) {
    let newTask = document.createElement("div")
    newTask.classList.add("task")
    let taskName = document.createElement("p")
    let number = taskList.childElementCount + 1
    taskName.innerText = `${number}) ${task}`
    let closeButton = document.createElement("button")
    closeButton.innerText = "⨉"
    closeButton.classList.add("close")
    closeButton.addEventListener("click", closeTask)
    newTask.setAttribute("id", id)
    newTask.appendChild(taskName)
    newTask.appendChild(closeButton)
    taskList.appendChild(newTask)
}