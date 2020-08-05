

//clock
const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours } :${
        minutes < 10 ? `0${minutes}` : minutes } :${
        seconds < 10 ? `0${seconds}` : seconds}`;
  }





//gretting

const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing"; 

function saveName(text){
localStorage.setItem(USER_LS, text);
}// 이름을 로컬저장소에 저장!


function handleSubmitName(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
} // 이름을 넣으면 그게 뜨게해주는 코드 

function askForName(){
form.classList.add(SHOWING_CN);
form.addEventListener("submit", handleSubmitName);
}


function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
/// user doesnt exit
        askForName();
    }else{
    paintGreeting(currentUser);
    };
};




// To do list

const toDoForm = document.querySelector(".toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toDoList");


const TODOS_LS = 'toDos';

let toDos = [];


function deleteToDo(event){
 const btn = event.target;
 const li = btn.parentNode;
 toDoList.removeChild(li);

 const cleanToDos = toDos.filter(function(toDo){
     return toDo.id !== parseInt(li.id);
 });
 toDos = cleanToDos
 saveToDos();

} //todo delete


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span")
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
      text: text,
      id: newId
  }
  toDos.push(toDoObj);
  saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

function loadToDos(){
const loadedToDos = localStorage.getItem(TODOS_LS);
if(loadedToDos !== null){
const parsedToDos = JSON.parse(loadedToDos);
parsedToDos.forEach(function(toDo){
paintToDo(toDo.text);
}) 
}
}



//bg

const body = document.querySelector("body");
const IMG_NUMBER = 8;


function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
  }


function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}
 

function init(){
const randomNumber = genRandom();
paintImage(randomNumber);
getTime();
setInterval(getTime, 1000);
loadName();
loadToDos();
toDoForm.addEventListener("submit", handleSubmit)
}

init();