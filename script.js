let itemContainerEl = document.getElementById("itemContainer");
let addTodoTaskEl = document.getElementById("addTodoTaskBtn");
let saveTodoListEl = document.getElementById("saveTodoList");


function getTodoListFromLocalStorage(){
  let stringifyTodoEl = localStorage.getItem("todoList"); //getting the todo list from local storage
  let parsedTodoListEl = JSON.parse(stringifyTodoEl);  //convert into parse string

  if(parsedTodoListEl === null){      
    return [];                       //if parsed todo list is null return empty 
  }
  else{                                 
    return parsedTodoListEl;      //Other wise return parsed todo list
  }
}

// let todoList = [  //Todo list object
//     {
//       text: "Learn HTML", 
//       uniqueNo : 1
//     },
//     {
//       text: "Learn CSS",   //Delecting existing todo list
//       uniqueNo : 2
//     },
//     {
//       text: "Learn JavaScript",
//       uniqueNo : 3
//     }
//   ];

let todoList = getTodoListFromLocalStorage(); //funtion call

  let todosCount =  todoList.length;
  
  saveTodoListEl.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList)); //Save into loacl storage 
  }

  function onGettingTodoStatus(checkboxId,labelId,todoId){ 
    let checkboxElement = document.getElementById(checkboxId);
    // console.log(checkboxElement.checked);                //getting line through 
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");

    let todoObjIndex = todoList.findIndex(function(eachTodo){  //finding todo object for save the line through
      let eachTodoId = "todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }
      else{
        return false;
      }
    });
    let todoObject = todoList[todoObjIndex];
    if(todoObject.isChecked === true){ // if todo object is true then return the false 
      todoObject.isChecked = false;    //else return the true

    }
    else{ 
      todoObject.isChecked = true;
    }

  }
function onDelectTodoList(todoId){
  let todoELement = document.getElementById(todoId);
  itemContainerEl.removeChild(todoELement); //removing the todo item from item container element
  let delectTodoTask = todoList.findIndex(function(eachTodo){ 
    let eachTodoId = "todo" + eachTodo.uniqueNo; //create each todo id 

    if(eachTodoId === todoId){    //delecting each todo list from local storage
      return true;              
    }
    else{
      return false;            // if each todo id is equal to todo id then return true else false 
    }
  });
  todoList.splice(delectTodoTask,1); // delecting index 
  // console.log(todoList);



}


function createAndAppendTodo(todo){

  let checkboxId = "checkbox" + todo.uniqueNo; //specifying a Unique number for each checkbox
  let labelId = "label" + todo.uniqueNo; //specifying a Unique number for each label 
  let todoId = "todo" +todo.uniqueNo; //specifying a Unique id for each todo
  
  
  let todoEl = document.createElement("li");
  todoEl.id = todoId;
  todoEl.classList.add("todo-item-containers");  //create li element and append to itemContainer element
  itemContainerEl.appendChild(todoEl);

  let inputEl = document.createElement("input");
  inputEl.type = "checkbox";
  inputEl.id = checkboxId;
  inputEl.checked = todo.isChecked; 
  inputEl.classList.add("input-checkbox");  //create input checkbox and append to todo element
  inputEl.onclick = ()=>{
    onGettingTodoStatus(checkboxId,labelId,todoId);  //adding event listeners to checkbox
  }
  todoEl.appendChild(inputEl);

  let labelContainerEl = document.createElement("div");
  labelContainerEl.classList.add("label-container"); //create label container and append to todo element
  todoEl.appendChild(labelContainerEl);

  let labelEl = document.createElement("label");
  labelEl.setAttribute("for", checkboxId);  //create label and append to label Contaner element
  labelEl.classList.add("label-checkbox");
  labelEl.id = labelId;
  labelEl.textContent = todo.text;
  if(todo.isChecked === true){ 
    labelEl.classList.add("checked"); //if todo.isChecked is true than we get line through  
  }

  labelContainerEl.appendChild(labelEl);

  let delectContainerEl = document.createElement("div");
  delectContainerEl.classList.add("dlt-icon-container"); //create delect container element 
  labelContainerEl.appendChild(delectContainerEl);

  let iconEl = document.createElement('i'); 
  iconEl.classList.add("fa-solid", "fa-trash-can" , "dlt-icon");  //set Delect Icon
  iconEl.onclick = function(){ 
    onDelectTodoList(todoId); //adding event listener to delect todo list
  }
  iconEl.classList.add("dlt-icon:hover");

  labelContainerEl.appendChild(iconEl);
}

for (let todo of todoList) { //looping todo list 
  createAndAppendTodo(todo);
}


function onAddTodoList(){  //to add new task 
  
  let userInputValueEl = document.getElementById("userInputValue");
  let userInputVal = userInputValueEl.value; 
  
  if(userInputVal === ""){
    alert("Enter valid text");
    return;
  }

  
  todosCount = todosCount+1;

  let newTodo ={   //creating new todo for todo list 
    text : userInputVal,
    uniqueNo :todosCount,
    isChecked : false
    
  };
  todoList.push(newTodo); //Append todoList to newTodo

  createAndAppendTodo(newTodo);
  userInputVal.value = "";

}

addTodoTaskEl.onclick = ()=> {
  onAddTodoList();
}











