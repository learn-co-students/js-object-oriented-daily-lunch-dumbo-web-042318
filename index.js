// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };



let neighborhoodId = 1;
class Neighborhood {
  constructor (name) {
    this.name = name;
    this.id = neighborhoodId++;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals() {
    // return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    // returns a unique list of meals orderd in a neighborhood
    let deliveries = this.deliveries()
    let meals = deliveries.map(delivery => delivery.meal())
    return Array.from(new Set(meals))

  }
}


let customerId = 1;
class Customer {
  constructor (name, neighborhoodId) {
    this.name = name;
    this.id = customerId++;
    store.customers.push(this);
    this.neighborhoodId = neighborhoodId;
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals() {
    // debugger;
    // return store.meals.filter(meal => meal.customerId === this.id);
    let deliveries = this.deliveries();
    return deliveries.map(delivery => delivery.meal())
  }

  totalSpent() {
    let i = 0;
    let meals = this.meals();
    meals.forEach(meal => i += meal.price)
    return i;

  }
}


let mealId = 1;
class Meal {
  constructor (title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }

  deliveries(){
    //all deliveries with a meal
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    // returns a unique list of customers who have ordered this meal
    let deliveries = this.deliveries();
    return deliveries.map(delivery => delivery.customer())
    }


  static byPrice() {
    return store.meals.sort(function(a, b) {return b.price - a.price})

  }
}


let deliveryId = 1;
class Delivery {
  constructor (mealId, neighborhoodId, customerId) {
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.mealId = mealId;
    this.id = deliveryId++;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => this.mealId === meal.id)

  }

  customer() {
    return store.customers.find(customer => this.customerId === customer.id)

  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => this.neighborhoodId === neighborhood.id)

  }

}
