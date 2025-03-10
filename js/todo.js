const TODOKEY = "vanilaTodo"
let todoData = JSON.parse(localStorage.getItem(TODOKEY)) || [];

const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-form input");
const todoClear = document.querySelector("#todo-clear");
const todoItems = document.querySelector("#listItems");

function saveTodoData() {
    localStorage.setItem(TODOKEY, JSON.stringify(todoData));
    console.log(todoData);
}

function displayListItem(item) {
    const list = document.createElement("li");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const delbutton = document.createElement("button");

    // set attributes for each elements
    input.type = "checkbox";
    input.checked = item.done;

    div.className = "textContainer"
    delbutton.className = "deleteItem";
    list.id = item.id;
    span.innerText = item.task;
    delbutton.innerText = "❌";

    // appendChild for todo List
    div.appendChild(input);
    div.appendChild(span);
    list.appendChild(div);
    list.appendChild(delbutton);
    todoList.appendChild(list);

    input.addEventListener("change",toggleTask);
    delbutton.addEventListener("click",deleteTask);
}

function addListItemsEffect() {
    if(todoList.children.length > 0) {
        todoItems.classList.add("listContainer");
    } else {
        todoItems.classList.remove("listContainer");
    }
}

function displayTodoList() {
    todoList.innerHTML = "";
    todoData.forEach(nodeData => displayListItem(nodeData));
    addListItemsEffect();
}

function toggleTask(event) {
    // Find index and toggle task
    // event.target.checked changed automatically
    const id = parseInt(event.target.parentElement.parentElement.id);

    console.log(`-------> checked ${id} item!!`);
    todoData.forEach(item => 
        {
            if(id === item.id) {
                item.done = !item.done;
            }
        });
    saveTodoData();
}

function deleteTask(event) {
    // Find index and delete task
    const li = event.target.parentElement;
    const id = parseInt(li.id);
    console.log(`-------> delete ${id} item!!`);

    li.remove();
    todoData = todoData.filter(item => {return (id !== item.id)});

    saveTodoData();
    addListItemsEffect();
}

function todoSubmitHandler(event) {
    event.preventDefault();

    if(todoInput.value != "") {
        const newTodoObj = { 
            task: todoInput.value,
            id: Date.now(),
            done: false,
        };
        todoData.push(newTodoObj);
        saveTodoData();
        displayListItem(newTodoObj);
        todoInput.value = "";
        addListItemsEffect();
        console.log(`-------> add new Task (${newTodoObj.task}) !!`);
    }
}

function clearAllTask() {
    console.log("-------> Clear all data!!");
    todoData.length = 0;
    saveTodoData();
    displayTodoList(); 
}

todoForm.addEventListener("submit", todoSubmitHandler);
//todoClear.addEventListener("click", () => {clearAllTask()});

displayTodoList();