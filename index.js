// global datastore

let store = {neighborhoods: [], meals: [], customers: [], deliveries: []};

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;


//--------------------------------------------------
class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }
  nonUMeals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal()
    })
  }
//
  meals(){
    return this.nonUMeals().filter((v, i, a) => a.indexOf(v) === i);
  }

}
//---------------------------------------------------
class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerId
    this.name = name

    if(neighborhoodId){
      this.neighborhoodId = neighborhoodId
    }

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal()
    })
  }

  //reducer = (accumulator, currentValue) => accumulator + currentValue;

  totalSpent(){
    let acc=0
    for(let meal in this.meals()){
      acc+= this.meals()[meal].price
      }
      return acc

  }




}
//---------------------------------------------------
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price


    store.meals.push(this)
  }
  // static byPrice(){
  //   debugger
  //     store.meals.sort(function(a[price]){return b - a});
  //   }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
     return store.customers.filter(customer => {
       return customer.meals().includes(this)
     })
  }
  static byPrice(){
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  }

}
//---------------------------------------------------
class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId
    if(mealId){
      this.mealId = mealId
    }
    if(neighborhoodId){
      this.neighborhoodId = neighborhoodId
    }
    if(customerId){
      this.customerId = customerId
    }

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }

}
