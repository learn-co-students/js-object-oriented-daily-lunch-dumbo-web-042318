// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let Neighborhood = (function() {

  let neighborhoodID = 1;

  return class {
    constructor(name) {
      this.name = name;
      this.id = neighborhoodID++;
      store.neighborhoods.push(this);
    }

    deliveries() {
      return store.deliveries.filter((delivery) => {
        return delivery.neighborhoodId === this.id
      })
    }

    customers() {
      return store.customers.filter((customer) => {
        return customer.neighborhoodId === this.id
      })
    }

    meals() {
      let deliveries = this.deliveries().map((delivery) => {
        return store.meals.find((meal) => {
          return meal.id === delivery.mealId
        })
      })
      let set = new Set(deliveries)
      return [...set];
    }
  }

  return NeighborhoodMaker;
})()

let Customer = (function() {

  let customerID = 1;

  class CustomerMaker {
    constructor(name, neighborhoodId) {
      this.name = name;
      this.id = customerID++;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this);
    }
    deliveries() {
      return store.deliveries.filter((delivery) => {
        return delivery.customerId === this.id
      })
    }

    meals() {
      return this.deliveries().map((delivery) => {
        return store.meals.find((meal) => {
          return meal.id === delivery.mealId
        })
      })
    }

    totalSpent() {
      return this.meals().reduce((accumulator, meal) => accumulator + meal.price, 0)
    }
  }

  return CustomerMaker;
})()

let Meal = (function() {

  let mealsID = 1;

  class MealMaker {
    constructor(title, price) {
      this.title = title;
      this.id = mealsID++;
      this.price = price;
      store.meals.push(this);
    }
    deliveries() {
      return store.deliveries.filter((delivery) => {
        return delivery.mealId === this.id
      })
    }

    customers() {
      let customers = this.deliveries().map((delivery) => {
        return store.customers.find((customer) => {
          return customer.id === delivery.customerId
        })
      })
      let set = new Set(customers)
      return [...set];
    }

    static byPrice() {
      return store.meals.sort((a,b) => b.price - a.price)
    }
  }



  return MealMaker;
})()

let Delivery = (function() {

  let deliveryID = 1;

  class DeliveryMaker {
    constructor(mealId, neighborhoodId, customerId) {
      this.id =  deliveryID++;
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      store.deliveries.push(this)
    }
    meal() {
      return store.meals.find((meal) => {
        return meal.id === this.mealId
      })
    }
    customer() {
      return store.customers.find((customer) => {
        return customer.id === this.customerId
      })
    }
    neighborhood() {
      return store.neighborhoods.find((neighborhood) => {
        return neighborhood.id === this.neighborhoodId
      })
    }
  }



  return DeliveryMaker;
})()
