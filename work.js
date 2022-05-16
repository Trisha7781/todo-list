const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');


class item {

    constructor(itemName) {
        //Create item div

        this.createDiv(itemName);

    }

    createDiv(itemName) {

        let input = document.createElement('input');
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input')
        input.type = "text";

        let itemBox = document.createElement('div');
        itemBox.classList.add('item')

        let editButton = document.createElement('button');
        editButton.innerHTML = "EDIT";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "REMOVE";
        removeButton.classList.add('removeButton');

        container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);


        editButton.addEventListener('click', () => this.edit(input));

        removeButton.addEventListener('click', () => this.remove(itemBox));

    }

    edit(input) {

        input.disabled = !input.disabled;
        if(!input.disabled){
            localStorage.setItem("old",input.value)
            input.focus()
            input.nextSibling.innerHTML='Done'
        }
        if(input.disabled){
            var old=localStorage.getItem("old")
            var arr=JSON.parse(localStorage.getItem("todos"))
            var newVal=input.value
            arr=arr.map((todo)=>{
                if(todo!=old){
                    return todo;
                }
                if(todo==old){
                    return newVal;
                }
            })
            localStorage.setItem("todos",JSON.stringify(arr))
            input.nextSibling.innerHTML='Edit'
            
        }
    }
/*
arr

[1,2,3,4,5]


'[1,2,3,4,5]'


[1,2,3,4,5]

*/
    remove(item) {
        var value=item.firstChild.value;
        var arr=JSON.parse(localStorage.getItem("todos"))
        arr=arr.filter((todo)=>todo!=value)
        if(arr.length>0){
            localStorage.setItem("todos",JSON.stringify(arr))
        }
        else{
            localStorage.removeItem("todos")
        }
        container.removeChild(item);
    }

}

function check() {

    if (input.value != "") {
        new item(input.value);
        if(!localStorage.getItem("todos")){
          var newArray=[input.value]
        localStorage.setItem("todos",JSON.stringify(newArray))

        
        }
        else{
            var arr=JSON.parse(localStorage.getItem("todos"))
            var newArray=[...arr,input.value]

            localStorage.setItem("todos",JSON.stringify(newArray))

        }
    
        console.log(newArray)
        input.value = "";
    }

}

addButton.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
}

);

document.addEventListener('DOMContentLoaded', function () {

    if(localStorage.getItem("todos")){
       var arr=JSON.parse(localStorage.getItem("todos"))
       arr.map((todo)=>{
        new item(todo);

       })
    }

})
