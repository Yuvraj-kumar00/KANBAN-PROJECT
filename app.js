const showPopupButton = document.querySelector("#addBoardsButton");
const addBoardButton = document.querySelector("#submitButton");
const boardContainer = document.querySelector("#boardContainer");
const popupCard = document.querySelector("#popupCard");
const boardNames = document.querySelector("#name");
const description = document.querySelector("#description");

// DELETE BOARD 
const deleteBoardFn = (e) => {
    e.target.parentElement.remove();
}

// EDIT ITEM
const editItemFn = (e) => {
    const editValue = prompt("Edit your Task here...");
    e.target.previousElementSibling.innerText = editValue;
}

// DELETE ITEM 
const deleteItemFn = (e) => {
    e.target.parentElement.parentElement.parentElement.parentElement.firstChild.lastChild.innerText = e.target.parentElement.parentElement.parentElement.children.length - 1; 
    
    e.target.parentElement.parentElement.remove();
}

// DATE AND TIME
function dateTime() {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes()
    const second = date.getSeconds();

    const dates = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} ${hour}:${minute}:${second}`;

    return dates;
}

// SHOW ITEM INSIDE BOARD
const addItem = (e) => {
     const userInput = prompt("Write your task....");
     const userNameInput = prompt("Write your name");

     if (userInput === "" || userNameInput === "" || userInput === null || userNameInput === null) {
        alert("Please not add empty task..")
     } else {
        // CREATING BOARD ITEM
        const boardItem = document.createElement("div");
        boardItem.classList.add("board-item");
        boardItem.setAttribute("draggable", true);
        boardItem.addEventListener("dragstart", (e) => {
            boardItem.classList.add("flying");
            e.target.parentElement.parentElement.firstChild.lastChild.innerText = e.target.parentElement.children.length - 1;
        });
        boardItem.addEventListener("dragend", (e) => {
            boardItem.classList.remove("flying");
            e.target.parentElement.parentElement.firstChild.lastChild.innerText = e.target.parentElement.children.length;
            
        });
    
        // CREATING BOARD ITEM TASK
        const boardItemTask = document.createElement("div");
        boardItemTask.classList.add("board-item-task");
    
        // CREATING PARAGRAPH
        const para = document.createElement("p");
        boardItemTask.appendChild(para);
        para.innerText = `${userInput}`;
    
        // CREATING EDIT ITEM
        const editItem = document.createElement("img");
        editItem.src = "edit.png";
        editItem.classList.add("edit-button");
        boardItemTask.appendChild(editItem);
        editItem.addEventListener("click", editItemFn)
    
        // CREATING DELETE ITEM
        const deleteItem = document.createElement("img");
        deleteItem.src = "bin.png";
        deleteItem.classList.add("delete-button");
        boardItemTask.appendChild(deleteItem);
        deleteItem.addEventListener("click", deleteItemFn)
    
        // CREATING ABOUT USER DIV
        const aboutUser = document.createElement("div");
        aboutUser.classList.add("about-user");
    
        // CREATING BOARD TIME-DATE
        const boardItemDate = document.createElement("p");
        boardItemDate.classList.add("board-time-date");
        boardItemDate.innerText = `${dateTime()}`;
        aboutUser.appendChild(boardItemDate);
    
        // CREATING USER NAME DIV
        const userName = document.createElement("p");
        userName.classList.add("user-name");
        userName.innerText = `${userNameInput}`;
        aboutUser.appendChild(userName);
        
        // APPENDING BOARD ITEM TASK AND ABOUT USER INSIDE BOARD ITEM
        boardItem.appendChild(boardItemTask);
        boardItem.appendChild(aboutUser);
    
        // APPENDING BOARD ITEM INSIDE BOARD ITEM CONTAINER
        if (e.target.className === "add-item-button") {
            e.target.parentElement.lastChild.appendChild(boardItem)
        }

        else if (e.target.className === "plusIcon") {
            e.target.parentElement.parentElement.lastChild.appendChild(boardItem)
        }

        // UPDATING TOTAL ITEM INSIDE BOARD
        e.target.parentElement.firstChild.lastChild.innerText = e.target.parentElement.lastChild.children.length;
        
     }
     
}

// SHOW BOARD
const addBoard = () => {
   if (boardNames.value === "" || description.value === "") {
     alert("Please write your board name and description before submit..")
   } else {
     // CREATING BOARD
     const board = document.createElement("div");
     board.classList.add("board");

     // ABOUT BOARD
     const boardHeading = document.createElement("div");
     boardHeading.classList.add("board-headings");
 
     const boardColorPicker = document.createElement("div");
     boardColorPicker.classList.add("board-color-picker");
     boardHeading.appendChild(boardColorPicker);
 
     const boardName = document.createElement("div");
     boardName.classList.add("board-name");
     boardName.innerText = `${boardNames.value}`;
     boardHeading.appendChild(boardName);
 
     const boardTotalItem = document.createElement("div");
     boardTotalItem.classList.add("total-items");
     boardTotalItem.innerText = 0;
     boardHeading.appendChild(boardTotalItem);
 
     const boardDescription = document.createElement("p");
     boardDescription.classList.add("board-description");
     boardDescription.innerText = `${description.value}`;

     // CREATING BOARD ITEM CONTAINER
     const boardItemContainer = document.createElement("div");
     boardItemContainer.classList.add("board-item-container");
     boardItemContainer.addEventListener("dragover", () => {
        boardItemContainer.appendChild(document.querySelector(".flying"));
     })

    //  CREATING BOARD DELETE ITEM
     const deleteBoard = document.createElement("img");
     deleteBoard.classList.add("deleteBoard")
     deleteBoard.src = "bin.png";
     deleteBoard.addEventListener("click", deleteBoardFn)
 
     // CREATING ADD ITEM BUTTON
     const addItemButton = document.createElement("button");
     addItemButton.classList.add("add-item-button");
     addItemButton.innerHTML = `<span class="plusIcon">+</span>Add Item`;
     addItemButton.addEventListener("click", addItem)
 
     // APPENDING ITEM INSIDE BOARD
     board.appendChild(boardHeading);
     board.appendChild(boardDescription);
     board.appendChild(addItemButton);
     board.appendChild(deleteBoard);

     // APPENDING BOARD ITEM Container INSIDE BOARD 
     board.appendChild(boardItemContainer);
 
     // APPENDING BOARD INSIDE BOARD CONTAINER
     boardContainer.appendChild(board);

    //  HIDE POPUP 
     popupCard.classList.remove("active");
     boardNames.value = "";
     description.value = "";
   }
}

// SHOW POPUP CARD
const showPopup = () => {
    popupCard.classList.add("active");
}

showPopupButton.addEventListener("click", showPopup)
addBoardButton.addEventListener("click", addBoard)
