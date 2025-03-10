const loginComment = document.querySelector("#login-comment");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

const greeting = document.querySelector("#greeting");
const clockView = document.querySelector("#clock");
const todoView = document.querySelector("#todos");

const resetBtn = document.querySelector("#resetBtn");

const HIDDEN_CLASSNAME = "hidden";
const TODOVIEW_CLASSNAME = "todoContainer";
const USERNAME_KEY = "username";
const TODO_KEY = "vanilaTodo";


function showGreeting() {
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    if(savedUsername === null) {
        loginComment.classList.remove(HIDDEN_CLASSNAME);
        loginForm.classList.remove(HIDDEN_CLASSNAME);

        greeting.classList.add(HIDDEN_CLASSNAME);
        clockView.classList.add(HIDDEN_CLASSNAME);
        todoView.classList.add(HIDDEN_CLASSNAME);
        todoView.classList.remove(TODOVIEW_CLASSNAME);
    }
    else {
        loginComment.classList.add(HIDDEN_CLASSNAME);
        loginForm.classList.add(HIDDEN_CLASSNAME);

        greeting.innerText = `Hello ${savedUsername}`;
        greeting.classList.remove(HIDDEN_CLASSNAME);
        clockView.classList.remove(HIDDEN_CLASSNAME);
        todoView.classList.remove(HIDDEN_CLASSNAME);
        todoView.classList.add(TODOVIEW_CLASSNAME);
    }
}

function resetHandler() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TODO_KEY);
    showGreeting();
}

function onSubmitHandler(event) {
    const username = loginInput.value;
    //event.preventDefault();
    console.log(username);
    localStorage.setItem(USERNAME_KEY, username);
    showGreeting();
}

loginForm.addEventListener("submit", onSubmitHandler);
resetBtn.addEventListener("click", resetHandler);

showGreeting();