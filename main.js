
// variables
let inputField = document.querySelector(".add-task input")

let addButton = document.querySelector(".plus-mark")

let noTaskContainer = document.querySelector(".no-task-msg")

let noTaskOrg = document.querySelector(".no-task")

let taskContent = document.querySelector(".task-content")

let task = document.getElementsByClassName("task")

let taskControl = document.querySelector(".control-all")

let tasksCount = document.querySelector(".task-count .tasks span")

let completedTasksCount = document.querySelector(".task-count .completed span")



// on load function

window.onload = function () {

    inputField.focus();

    getTasks()

}

// add button 

addButton.onclick = function () {

    if (inputField.value === "") {

        swal("Oops", "You Have to Add a Task !", "error")

    } else {

        noTaskOrg.innerHTML = ""

        addTaskToDom(inputField.value)

        storeTasks();

        inputField.value = "";

        inputField.focus();

        finishAll();

        deleteAll();

        calculateTasks();

    }

}


// adding task content &&&& adding delete button

function addTaskToDom(taskCon) {
    // adding task content

    let mainTaskContent = document.createElement("div")

    mainTaskContent.className = "main-task"

    let mainTaskSpan = document.createElement("span")

    mainTaskSpan.className = "task"

    let mainTaskSpanContent = document.createTextNode(taskCon)

    mainTaskSpan.appendChild(mainTaskSpanContent)

    // adding delete button

    let deleteSpan = document.createElement("span")

    deleteSpan.className = "delete"

    let deleteText = document.createTextNode("delete")

    deleteSpan.appendChild(deleteText)

    mainTaskContent.appendChild(mainTaskSpan)

    mainTaskContent.appendChild(deleteSpan)

    taskContent.appendChild(mainTaskContent)
}

// creating select all 


function finishAll() {

    if (taskContent.childElementCount > 0 && !document.querySelector(".select-all")) {

        let selectallbutton = document.createElement("div")

        selectallbutton.className = "select-all"

        let selectallbuttonText = document.createTextNode("select all")

        selectallbutton.appendChild(selectallbuttonText)

        taskControl.appendChild(selectallbutton)

        noTaskOrg.style.display = "hidden"


        selectallbutton.addEventListener("click", function () {

            Array.from(task).forEach(ele => {

                if (!Array.from(task).every(function (ele) { ele.classList.contains("finished") })) {

                    ele.classList.add("finished")
                }
                selectallbutton.addEventListener("click", function () {

                    Array.from(task).forEach(ele => {

                        ele.classList.toggle("finished")

                        calculateTasks()
                    })
                })
            })

        })

    }
}

// creating delete all 

function deleteAll() {

    if (taskContent.childElementCount > 0 && !document.querySelector(".delete-all")) {

        let deleteallbutton = document.createElement("div")

        deleteallbutton.className = "delete-all"

        let deleteallbuttonText = document.createTextNode("delete-all")

        deleteallbutton.appendChild(deleteallbuttonText)

        taskControl.appendChild(deleteallbutton)

        // noTaskOrg.style.display = "hidden"

        deleteallbutton.addEventListener("click", function () {

            Array.from(taskContent.children).forEach(ele => {

                ele.remove()

                taskControl.innerHTML = ""

                noTaskOrg.innerHTML = "no tasks to show"

                calculateTasks()

            });
            window.localStorage.removeItem("task")
        })
    }
}




document.addEventListener("click", function (e) {

    if (e.target.className === "delete") {

        taskText = e.target.previousSibling.textContent

        console.log(taskText)

        e.target.parentNode.remove()

        removeDeleteAllButton()

        calculateTasks()

        removingTaskFromLocalStorage()


    }

    if (e.target.classList.contains("task")) {

        e.target.classList.toggle("finished")
        calculateTasks()
    }

})


// remove Delete All Button

function removeDeleteAllButton() {

    if (taskContent.childElementCount == 0) {

        taskControl.innerHTML = "";

        noTaskOrg.innerHTML = "no tasks to show"

    } else {

        return false

    }

}


// create No Task Msg

function createNoTaskMsg() {

    if (taskContent.childElementCount == 0) {

        noTaskOrg.innerHTML = ""

    }
}

// calculateTasks

function calculateTasks() {

    tasksCount.innerHTML = taskContent.childElementCount

    completedTasksCount.innerHTML = document.querySelectorAll(".finished").length

}


// store task in local Storage

function storeTasks() {

    let tasksContentArr = []

    let tasks = Array.from(task)

    tasks.forEach(tk => {

        tasksContentArr.push(tk.innerHTML)

        window.localStorage.setItem("task", tasksContentArr)

    });
}


// get task from local Storage

function getTasks() {

    if (window.localStorage.getItem("task")) {

        noTaskOrg.innerHTML = ""

        let getItems = window.localStorage.getItem("task")

        for (i = 0; i < getItems.split(",").length; i++) {

            addTaskToDom(getItems.split(",")[i])

            finishAll();

            deleteAll();

            calculateTasks();

        }
    } else {

        noTaskOrg.innerHTML = "no tasks to show"

    }

}



// removing task from local storage

function removingTaskFromLocalStorage() {

    let newStorage = window.localStorage.getItem("task").split(",")

    newStorage = newStorage.filter(el => el !== taskText).join(",")

    localStorage.setItem("task", newStorage)

}


