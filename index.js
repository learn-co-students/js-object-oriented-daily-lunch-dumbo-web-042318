// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

const Neighborhood = (function(){

  let neighborhoodId = 0;

  return class {

    constructor(name){
      this.id = ++neighborhoodId;
      this.name = name;
      store.neighborhoods.push(this);
    }

    deliveries(){
      return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId === this.id;
      });
    }

    customers(){
      return store.customers.filter(customer => {
        return customer.neighborhoodId === this.id;
      });
    }

    meals(){
      let mealsArr = [];

      for(let delivery of this.deliveries()){
        mealsArr.push(store.meals.find(meal => {
          return delivery.mealId === meal.id
        }));
      }
      const result = [...new Set(mealsArr)]
      return result;
    }

  }
})();

const Customer = (function(){

  let customerId = 0;

  return class {

    constructor(name, neighborhoodId){
      this.name = name;
      this.id = ++customerId;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this);
    }

    deliveries(){
      return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id;
      });
    }

    meals(){
      let result = [];

      for(let delivery of this.deliveries()){
        result.push(store.meals.find(meal => {
          return delivery.mealId === meal.id
        }));
      }
      return result;
    }

    totalSpent(){
      const mealPriceArr = this.meals().map(meal => {
        return meal.price;
      });

      return mealPriceArr.reduce((acc, price) => acc + price);
    }

  }
})();

const Meal = (function(){

  let mealId = 0;

  return class {

    constructor(title, price){
      this.title = title;
      this.price = price;
      this.id = ++mealId;
      store.meals.push(this);
    }

    deliveries(){
      return store.deliveries.filter(delivery => {
        return delivery.mealId === this.id;
      });
    }

    customers(){
      let result = [];

      for(let delivery of this.deliveries()){
        result.push(store.customers.find(customer => {
          return delivery.customerId === customer.id
        }));
      }
      return result;
    }

    static byPrice(){
      return store.meals.sort(function(a, b){
        return a.price < b.price;
      });
    }

  }

})();

const Delivery = (function(){

  let deliveryId = 0;

  return class {

    constructor(mealId, neighborhoodId, customerId){
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      this.id = ++deliveryId;
      store.deliveries.push(this);
    }

    meal(){
      return store.meals.find(meal => {
        return meal.id === this.mealId;
      });
    }

    customer(){
      return store.customers.find(customer => {
        return customer.id === this.customerId;
      });
    }

    neighborhood(){
      return store.neighborhoods.find(neighborhood => {
        return neighborhood.id === this.neighborhoodId;
      });
    }

  }

})();
