// global datastore
function onlyUnique(value, index, self) {
   return self.indexOf(value) === index;
}

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

const Neighborhood = (function () {
  let neighborhoodId = 1

  class Neighborhood2 {
    constructor(name) {
      this.name = name
      this.id = neighborhoodId++
      store.neighborhoods.push(this)
    }

    deliveries() {
      let result = store.deliveries.filter(function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this));

      return result;
    }

    customers() {
      let result = store.customers.filter(function(customer) {
        return customer.neighborhoodId === this.id
      }.bind(this));

      return result;
    }

    meals() {
      let deliveries = this.deliveries();
      let meals =[];
       deliveries.forEach(function(delivery) {
        meals.push(delivery.meal())
      })
      let unique = meals.filter(onlyUnique)
        return unique
    }
  }

  return Neighborhood2
})()

const Customer = (function () {
  let customerId = 1

  class Customer2 {
    constructor(name, neighborhoodId) {
      this.name = name
      this.neighborhoodId = neighborhoodId
      this.id = customerId++
      store.customers.push(this)
    }

    deliveries() {
      let result = store.deliveries.filter(function(delivery) {
        return delivery.customerId === this.id
      }.bind(this))
      return result
    }

    meals() {
      let deliveries = this.deliveries();
      let meals =[];
       deliveries.forEach(function(delivery) {
        meals.push(delivery.meal())
      })
      return meals
    }

    totalSpent() {
      let meals = this.meals()
      let cost = 0
      meals.forEach(function(meal) {
        console.log(meal)
        cost += meal.price
      })
      return cost
    }
  }

  return Customer2
})()

const Meal = (function () {
  let mealId = 1

  class Meal2 {
    constructor(title, price) {
      this.title = title
      this.price = price
      this.id = mealId++
      store.meals.push(this)
    }
    deliveries() {
      let result = store.deliveries.filter(function(delivery) {
        return delivery.mealId === this.id
      }.bind(this));
      return result
    }

    customers() {
      let deliveries = this.deliveries()
      let customers = []
      deliveries.forEach(function(delivery) {
        customers.push(delivery.customer())
      })
      return customers
    }

    static byPrice() {
      let allMeals = [...store.meals]
      allMeals.sort(function(a,b) {
        return b.price - a.price;
      })
      return allMeals
    }
  }

  return Meal2
})()

const Delivery = (function () {
  let deliveryId = 1

  class Delivery2 {
    constructor(mealId, neighborhoodId, customerId) {
      this.mealId = mealId
      this.neighborhoodId = neighborhoodId
      this.customerId = customerId
      this.id = deliveryId++
      store.deliveries.push(this)
    }

    meal() {
      let result = store.meals.filter(function(meal) {
        return meal.id === this.mealId
      }.bind(this))
      return result[0]
    }

    customer() {
      let result = store.customers.filter(function(customer) {
        return customer.id === this.customerId
      }.bind(this))
      return result[0]
    }

    neighborhood() {
      let result = store.neighborhoods.filter(function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this))
      return result[0]
    }
  }

  return Delivery2
})()
