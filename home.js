// get the dropdown button element
var dropdownBtn = document.getElementById("dropdownMenuTypeButton");

// add event listener to dropdown menu items
var dropdownItems = document.querySelectorAll("#dropdown-item-type");
dropdownItems.forEach(function(item) {
  item.addEventListener("click", function() {
    // get the text of the clicked item
    var text = item.textContent.trim();
    
    // set the dropdown button text to the clicked item text
    dropdownBtn.textContent = text;
  });
});

//filter each shop
function filterSelection(c) {
  var x, i, j;
  x = document.getElementsByClassName("filterDiv");

  c = c.split(" ");

  //Page number fit food type content
  if (Math.ceil(c.length/2) == 4){
    currentIndex = 8;
    maxIndex = currentIndex + Math.ceil(c.length/2) - 1;
  }
  else {
    currentIndex = 1;
    maxIndex = Math.ceil(c.length/2);
  }
  
  updateProgressBar();

  for (i = 0; i < x.length; i++) {
    AddClass(x[i], "hide");
    var temp = x[i].className.split(' ');
    for (j = 0; j < c.length; j++) {
      //console.log(temp[1]);
      if (temp[1] === c[j])
        RemoveClass(x[i], "hide");
    }
  }
}

//filter each page
pageSelection('all');
function pageSelection(c) {
  x = document.getElementsByClassName("grid");
  if (c == 'all') {
    c = '1';
    maxIndex = 6;
  }
  else if (c == '8') {
    currentIndex = 8;
    maxIndex = 11;
  }

  c = c.split(" ");

  for (i = 0; i < x.length; i++) {
    AddClass(x[i], "hide");
    var temp = x[i].className.split(' ');
    for (j = 0; j < c.length; j++) {
      if (temp[1] === c[j]) {
        //console.log(temp[1], c[j]);
        RemoveClass(x[i], "hide");
      }
    }
  }
}

function AddClass(element, name) {
  var arr1;
  arr1 = element.className.split(" ");
    if (arr1.indexOf(name) == -1) {
      element.className += " " + name;
      //console.log('add : ',element.className);
    }
}

function RemoveClass(element, name) {
  var arr1;
  arr1 = element.className.split(" ");
    while (arr1.indexOf(name) > -1) {
      arr1.splice(arr1.indexOf(name), 1);     
    }
  element.className = arr1.join(" ");
  //console.log('remove : ',element.className);
}

//log in
$('#categoryFilter').on('change', function() {
  var selectedCategory = $(this).val();
  if (selectedCategory == 'all') {
    $('#cardContainer').children().show();
  } else {
    $('#cardContainer').children().hide();
    $('#cardContainer').children('.' + selectedCategory).show();
  }
});

$(document).ready(function(){
$('#signInModal').modal('show');
});


//button page number
let currentIndex = 1;
var maxIndex = 6;
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

  prevButton.addEventListener("click", () => {
    if (currentIndex > 1 && currentIndex != 8) {
      currentIndex--;
      displayContent();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      displayContent();
    }
  });

function displayContent() {
  updateProgressBar();
  pageSelection(currentIndex.toString());
}
//progress bar page number
const progressBar = document.getElementById('progressBarPage');
function updateProgressBar() {
  //for single dish grid 8-11
  if (currentIndex >= 8) {
    progressBar.value = currentIndex-7;
    progressBar.max = maxIndex-7;
  }
  //all other grid
  else {
    progressBar.value = currentIndex;
    progressBar.max = maxIndex;
  }
  //console.log(currentIndex, maxIndex);
}

//Plus-Minus Button
const minusButtons = document.querySelectorAll('.minus');
const plusButtons = document.querySelectorAll('.plus');
const quantityInputs = document.querySelectorAll('.quantity');
minusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (quantityInputs[index].value > 1) {
      quantityInputs[index].value = parseInt(quantityInputs[index].value) - 1;
    }
  });
});
plusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (quantityInputs[index].value < 10) {
      quantityInputs[index].value = parseInt(quantityInputs[index].value) + 1;
    }
  });
});
// Checkout Button Click Event
$('.checkout-btn').on('click', function() {
  alert('Your order has been submitted!');
  cart = [];
  subtotal = 0;
  $('.cart-list').empty();
  $('.subtotal').text('0.00');
});

//Add to cart
var cart = [];
var subtotal = 0;
const buyButtons = document.querySelectorAll('.buy');
const priceText = document.querySelectorAll('#price');
const shpName = document.querySelectorAll('#shopName');
buyButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    var shpname = shpName[index].innerHTML; // get shop name from the card text shop name
    var name = $('.card-title').eq(index).text(); // get product name from the card title
    var qty = parseInt($('.quantity').eq(index).val()); // get product quantity from the input field
    var price = parseFloat(priceText[index].textContent); // get product price from the card text price
    var item = {
        shpname: shpname,
        name: name,
        qty: qty,
        price: price
    };
    cart.push(item);
    //console.log(item);
    updateCart();
  });
});

// Update Cart Function
function updateCart() {
    $('.cart-list').empty();
    var subtotal = 0;
    var shopItems = {}; // object to store items by shop name
  
    // Group the items by shop name
    $.each(cart, function(i, item) {
      if (!shopItems[item.shpname]) {
        shopItems[item.shpname] = [];
      }
      shopItems[item.shpname].push(item);
    });
  
    // Loop through the groups and display them in the cart
    $.each(shopItems, function(shpname, items) {
      var newList = $('<ul class="list-group">' +
        '<li class="list-group-item list-group-item-secondary">' +
        shpname +
        '</li>' +
        '</ul>');
      var shopTotal = 0;
  
      $.each(items, function(i, item) {
        var existingItem = newList.find('.cart-item-name:contains(' + item.name + ')');
        if (existingItem.length) {
          var existingQty = parseInt(existingItem.siblings('.cart-item-qty').text());
          var oldTotal = parseFloat(existingItem.siblings('.cart-item-price').text());
          var newTotal = (existingQty + item.qty) * item.price;
          existingItem.siblings('.cart-item-qty').text(existingQty + item.qty);
          existingItem.siblings('.cart-item-price').text(newTotal.toFixed(2));
          shopTotal += (newTotal - oldTotal);
        }
        else {
          var total = item.qty * item.price;
          shopTotal += total;
          newList.append('<li class="list-group-item">' +
            '<button class="add-btn minus-cart">-</button>' +
            '<span class="cart-item-qty">' + item.qty + '</span>' +
            '<span class="cart-item-name">' + item.name + '</span>' +
            '<span class="cart-baht">฿</span>' +
            '<span class="cart-item-price">' + total.toFixed(2) + '</span>' +
            '<button class="add-btn delete-cart"><i class="fa">&#xf014;</i></button>' +
            '</li>');
        }
      });
      subtotal += shopTotal;
      /*newList.append('<li class="list-group-item list-group-item-secondary">' +
        'Subtotal: <span class="shop-subtotal">' + shopTotal.toFixed(2) + '</span>' +
        '</li>');*/
      $('.cart-list').append(newList);
    });
  
  $('.subtotal').text(subtotal.toFixed(2));


  //minus buttons cart
  $('.minus-cart').click(function() {
    var itemName = $(this).siblings('.cart-item-name').text().trim();
    var existingItem = $('.cart-list').find('.cart-item-name:contains(' + itemName + ')');
    var existingQty = parseInt(existingItem.siblings('.cart-item-qty').text());
    
    // get item price from cart array
    var itemPrice;
    $.each(cart, function(i, item) {
      if (item.name === itemName) {
        itemPrice = item.price;
        return false;
      }
    });
    
    if (existingQty > 1) {
      var newQty = existingQty - 1;
      var newTotal = newQty * itemPrice;
      existingItem.siblings('.cart-item-qty').text(newQty);
      existingItem.siblings('.cart-item-price').text(newTotal.toFixed(2));
      subtotal -= itemPrice;
      $('.subtotal').text(subtotal.toFixed(2));
      
      // update item in cart array
      $.each(cart, function(i, item) {
        if (item.name === itemName) {
          item.qty -= 1;
          return false;
        }
      });
    } 
    return false;
  });

  //delete button cart
  $('.delete-cart').click(function() {
    var itemName = $(this).siblings('.cart-item-name').text();
    cart = cart.filter(function(item) {
      return item.name !== itemName;
    });
    updateCart();
  });

}

//Cart form
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


//1st floor 2nd floor
  function switchTo2ndFloor() {
    var firstFloorImg = document.querySelector('#firstfloor');
    var secondFloorImg = document.querySelector('#secondfloor');
    var firstFloorMap = document.querySelector('map[name="firstfloor"]');
    var secondFloorMap = document.querySelector('map[name="secondfloor"]');

    firstFloorImg.style.display = 'none';
    secondFloorImg.style.display = 'block';
    firstFloorMap.style.display = 'none';
    secondFloorMap.style.display = 'block';
  }

  function switchTo1stFloor() {
    var firstFloorImg = document.querySelector('#firstfloor');
    var secondFloorImg = document.querySelector('#secondfloor');
    var firstFloorMap = document.querySelector('map[name="firstfloor"]');
    var secondFloorMap = document.querySelector('map[name="secondfloor"]');

    secondFloorImg.style.display = 'none';
    firstFloorImg.style.display = 'block';
    secondFloorMap.style.display = 'none';
    firstFloorMap.style.display = 'block';
  }