var cheesePrice = 1.50;
var pepperoniPrice = 2.00;
var mushroomPrice = 1.90;
var baconPrice = 2.10;
var olivePrice = 1.60;

var pizzaIdsetter = 0;

function TotalOrder(){
  this.orders = []
}

TotalOrder.prototype.addOrder = function(pizza){
  pizza.id = this.assignId();
  this.orders.push(pizza);
  this.total = pizza.totalCost();
}

TotalOrder.prototype.assignId = function(){
  pizzaIdsetter+=1;
  return pizzaIdsetter;
}

function Pizza(size, price){
  this.toppings = [],
  this.size = size,
  this.price = price
}

function Topping(name, price){
  this.name = name,
  this.price = price
}

Pizza.prototype.addTopping = function(topping){
  this.toppings.push(topping);
  this.wholePizzaprice = this.totalCost();
}

Pizza.prototype.totalCost = function(){
  var totalCost = 0;
  for (var i = 0; i < this.toppings.length; i++){
    totalCost+=this.toppings[i].price;
  }
  return this.price + totalCost;
}

var myOrder = new TotalOrder();

$(document).ready(function() {
  $("#pizza-form").submit(function(event){
    event.preventDefault();
      var size = $("input:radio[name=size]:checked").val();

      var price;

      if (size === "Small"){
        price = 13;
      }else if(size === "Medium"){
        price = 16;
      }else{
        price = 19;
      }

      var toppingToArray =[];
      $("input:checkbox[name=topping]:checked").each(function(){
      var topping = $(this).val();
      toppingToArray.push(topping);
    });

      var pizza = new Pizza(size, price);
      myOrder.addOrder(pizza);

      for (var i = 0; i < toppingToArray.length; i++){
        if(toppingToArray[i] === "cheese"){
          var topping = new Topping("Cheese", cheesePrice)
          pizza.addTopping(topping);
        }else if(toppingToArray[i] === "pepperoni"){
          var topping = new Topping("Pepperoni", pepperoniPrice)
          pizza.addTopping(topping);
        }else if(toppingToArray[i] === "bacon"){
          var topping = new Topping("Bacon", baconPrice)
          pizza.addTopping(topping);
        }else if(toppingToArray[i] === "mushroom"){
          var topping = new Topping("Mushrooms", mushroomPrice )
          pizza.addTopping(topping);
        }else{
          var topping = new Topping("Black Olives", olivePrice)
          pizza.addTopping(topping);
        }
      }

    $(".order-info").show();
    $("#total").html("Your total cost is:<br>$"+ pizza.totalCost().toFixed(2));
  });
});
