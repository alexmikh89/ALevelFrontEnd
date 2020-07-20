function deleteItem(itemToRemove) {
    let index = letItBeDatabase.findIndex(i => i.id == itemToRemove.id);
    letItBeDatabase.splice(index, 1);
    itemToRemove.remove();
}

function clearDataFile(){
    letItBeDatabase = [];
}

function modifyData(index, editedData){
    letItBeDatabase[index].name = editedData;
}

function addNewElement(element){
    letItBeDatabase.push(element);
}