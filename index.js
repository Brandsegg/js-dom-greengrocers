const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity : 0,
      type: 'vegetable'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity : 0,
      type: 'vegetable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity : 0,
      type: 'fruit'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity : 0,
      type: 'fruit'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity : 0,
      type: 'vegetable'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity : 0,
      type: 'fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity : 0,
      type: 'vegetable'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity : 0,
      type: 'fruit'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity : 0,
      type: 'fruit'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity : 0,
      type: 'vegetable'
    }
  ],
  cart: []
};



let itemList = document.querySelector('.store--item-list')
const cartList = document.querySelector('.cart--item-list')


function createItems(array){
  
  for(let item of array){

    const li = document.createElement('li');

    const div = document.createElement('div');
    div.classList.add('store--item-icon')

    const button = document.createElement('button');
    button.textContent = 'Add to cart';

    let img = document.createElement('img');
    img.src = `assets/icons/${item.id}.svg`
    div.appendChild(img)
    
    button.onclick = function(){addToCart(item); calculateTotal()};
    
    li.appendChild(div)
    li.appendChild(button);
    itemList.appendChild(li);
    
  }
}

function addToCart(item){
  //if item in cart
  if(state.cart.includes(item)){
    
    //increase quantity
    item.quantity ++
    
    const span = document.getElementById(item.id)
    span.textContent = item.quantity
  }
  else{
    item.quantity = 1
    const li = document.createElement('li');
    li.id = `${item.name}`

    const img = document.createElement('img')
    img.classList.add('.cart--item-icon')
    img.className = 'cart--item-icon'
    img.src = `assets/icons/${item.id}.svg`
    img.alt = item.name

    const p = document.createElement('p')
    const node = document.createTextNode(`${item.name}`);
    p.appendChild(node);

    const decreaseButton = document.createElement('button')
    decreaseButton.className = 'quantity-btn remove-btn center'
    decreaseButton.textContent = '-';
    decreaseButton.onclick = function(){decrease(item); calculateTotal()};

    const span = document.createElement('span')
    span.className = "quantity-text center"
    span.id = `${item.id}`
    span.textContent = item.quantity

    const increaseButton = document.createElement('button')
    increaseButton.className = 'quantity-btn add-btn center'
    increaseButton.textContent = '+';
    increaseButton.onclick = function(){increase(item); calculateTotal()};

    li.appendChild(img)
    li.appendChild(p)
    li.appendChild(decreaseButton)
    li.appendChild(span)
    li.appendChild(increaseButton)
    cartList.appendChild(li)

    state.cart.push(item)
  }
  
  console.log(state.cart)
}

function calculateTotal(){
  let sum = 0
  let costSpan = document.getElementsByClassName('total-number')[0]
  for(let item of state.cart){
    if(state.items.includes(item)){
      sum += Number((item.price * item.quantity))
      console.log(item.name)
    }
  }
  costSpan.textContent = `${sum.toFixed(2)}£`
}

function increase(item){
  item.quantity++
  const span = document.getElementById(item.id)
  span.textContent = item.quantity
}

function decrease(item) {
  
  const span = document.getElementById(item.id);
  if (item.quantity === 1){
    //delete the mf item
    let li = document.getElementById(item.name)
    //remove li
    cartList.removeChild(li)
    //remove from list
    let index = state.cart.indexOf(item)
    state.cart.splice(index, 1)
    
  }
  if (item.quantity > 0) {
      item.quantity--;
      
  }
  span.textContent = item.quantity;
}

/*
let sortButton = document.getElementById('sort-button')
sortButton.onclick = function(){sortItems()}

function sortItems(){
  state.cart.sort((a,b) => a.quantity - b.quantity)
}
  */
let filterFruitButton = document.getElementById('filterF-button')
let filterVegButton = document.getElementById('filterV-button')
let filterAllButton = document.getElementById('filterA-button')
filterFruitButton.onclick = function(){filterFruit()}
filterVegButton.onclick = function(){filterVeg()}
filterAllButton.onclick = function(){showAll()}

function filterFruit(){
  //remove everything from the screen
  document.querySelector('.store--item-list').innerHTML = ''
  let arr = []
  //remove stuff from list then create items again
  for (let item of state.items){
    if (item.type == 'vegetable'){
      arr.push(item)
    }
  }
  createItems(arr)
}

function filterVeg(){
  //remove everything from the screen
  document.querySelector('.store--item-list').innerHTML = ''
  let arr = []
  //remove stuff from list then create items again
  for (let item of state.items){
    if (item.type == 'fruit'){
      arr.push(item)
    }
  }
  createItems(arr)
  
}

function showAll(){
  document.querySelector('.store--item-list').innerHTML = ''
  createItems(state.items)
}

//run
createItems(state.items)