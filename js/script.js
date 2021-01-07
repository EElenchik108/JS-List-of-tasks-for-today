"use strict";

let main =  document.getElementsByTagName('main')[0];
let input = document.getElementById('item');   
let button = document.getElementById('clear');
let counter = document.getElementById('counter');
let itemsArray = localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')):[];
counter.innerHTML = itemsArray.length;

input.addEventListener('change', ()=> {
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  createItem(input.value);
  input.value='';
  counter.innerHTML = itemsArray.length;
})
button.addEventListener('click', ()=>{
  localStorage.clear();
  counter.innerHTML = 0;
  itemsArray = [];
  counter.innerHTML = itemsArray.length;
  let rows = document.querySelectorAll('.row');
  for (let j=0; j<rows.length; j++) {
    rows[j].remove()
  }
})

let elem = document.querySelector('.row').cloneNode(true);

const createItem = (task)=>{
  let itemElem = elem.cloneNode(true);
  itemElem.classList.remove('noneDisplay');
  let span = itemElem.children[1].children[0];
  span.innerHTML = task;
  let dlt = itemElem.children[2];
  
  dlt.addEventListener('click', function (){
    this.parentElement.remove();      
    itemsArray = JSON.parse(localStorage.getItem('items'));
 
    for (let i=0; i<itemsArray.length; i++) {
      if (itemsArray[i]==task) itemsArray.splice(i,1);      
    }
    counter.innerHTML = itemsArray.length;
    localStorage.setItem('items', JSON.stringify(itemsArray)); 
  })
  let check = itemElem.children[0];
  check.addEventListener('click', function (){
    check.classList.toggle('doneIcon');
  });
  main.append(itemElem);
};

for (let i=0; i<itemsArray.length; i++) {
  createItem(itemsArray[i]);
}