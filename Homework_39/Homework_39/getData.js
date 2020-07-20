var content;
var letItBeDatabase; // A kind of database.

//var Item - a name for 'input' field and two buttons: "delete" and "edit"/"save".

window.onload = function() {
    let getDataButton = document.querySelector('.getData');
    getDataButton.addEventListener('click', getData);
    content = document.querySelector('.content');
    letItBeDatabase = [{ name: 'Item 1', id: 1 }, { name: 'Item 2', id: 2 }, { name: 'Item 3', id: 3 }];
}

function getData() {
    var getDataButton = document.querySelector('.getData');
    // Delay for non-empty base (emulates loading).
    let delay = 2000; //  Shange to set a delay.

    // Disabling 'Get Data' button to prevent multiple-loading from DB.
    getDataButton.disabled=true;

    // Flushing our data view every time before data loading - to get current DB.
    if (content.hasChildNodes) {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
    }

    if (letItBeDatabase.length >= 0) {
        setTimeout(() => {
            for (let index = 0; index < letItBeDatabase.length; index++) {
                addItem(letItBeDatabase[index]);
            }

            // Enabling  'Get Data' button to allow user get fresh data from db.
            getDataButton.disabled=false;            
        }, delay); 
    }

    // Adding main buttons for the first data load.
    if (document.querySelector('.buttons').children.length == 0) {
        addMainButtons();
    }
}

function addMainButtons() {
    let addNewItemButton = document.createElement('button');
    addNewItemButton.innerHTML = "Add new";
    addNewItemButton.addEventListener("click", () => { addItem(null) });
    document.querySelector('.buttons').appendChild(addNewItemButton);

    let clearAllItemsButton = document.createElement('button');
    clearAllItemsButton.innerHTML = "Clear all";
    clearAllItemsButton.addEventListener("click", clearAll);
    document.querySelector('.buttons').appendChild(clearAllItemsButton);
}

function clearAll() {    
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    clearDataFile();
}


function addItem(item) {
    // Giving a default name to item if it does not exist (new item was created) and pushing it to DB.
    if (!item) {
        let id = 0;
        let name = 'New Item';

        if (letItBeDatabase.length !== 0) {
            id = (letItBeDatabase[letItBeDatabase.length - 1].id + 1);
        }
        item = { name: name, id: id };

        // Pushing to DB.
        addNewElement(item);
    }

    let newItem = document.createElement('div');
    newItem.id = item.id;

    // Inserting input field and buttons in new <div>.
    let fieldToInsert = ("<input disabled class='inputField' value= '" + item.name + "'></input>");
    let deleteButtonToInsert = "<button type='button' class='deleteItemButton'>Delete</button>";
    let editButtonToInsert = "<button type='button' class='editItemButton'>Edit</button>";
    newItem.innerHTML = fieldToInsert + deleteButtonToInsert + editButtonToInsert;

    // Adjusting buttons' instances.
    let deleteItemButton = newItem.querySelector('.deleteItemButton');
    deleteItemButton.addEventListener('click', (event) => { deleteItem(event.target.parentNode) });

    let editItemButton = newItem.querySelector('.editItemButton');
    editItemButton.addEventListener('click', (event) => { editItem(event.target.parentNode) });

    content.appendChild(newItem);
}

function editItem(itemToEdit) {
    var inputField = itemToEdit.querySelector('.inputField');
    var editItemButton = itemToEdit.querySelector('.editItemButton');

    if (inputField.disabled == true) {
        inputField.disabled = false;
        editItemButton.innerHTML = 'Save';
    } else {
        let textInInputBox = inputField.value; // Some text to transfer into DB.
        let index = letItBeDatabase.findIndex(i => i.id == itemToEdit.id);
        
        editItemButton.innerHTML = 'Edit';
        inputField.disabled = true;

        // Modifying current element in DB.
        modifyData(index, textInInputBox);
    }
} 