// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// const Neighborhood = (function(){
  let neighborhoodId = 1

  class Neighborhood {
    constructor(name) {
      this.name = name
      this.id = neighborhoodId++
      store.neighborhoods.push(this)
    }

  deliveries(){
    const neighborhoodDeliveries = store.deliveries.filter(function(delivery){
      return delivery.neighborhoodId === this.id
    }.bind(this))

    return neighborhoodDeliveries
  }

  customers(){
    const neighborhoodCustomers = store.customers.filter(function(customer){
      return customer.neighborhoodId === this.id
    }.bind(this))

    return neighborhoodCustomers
  }

  meals(){
    const neighborhoodDeliveryMealIds = this.deliveries().map(function(delivery) {
        return delivery.mealId
      })

    const neighborhoodMeals = []
    for (const meal of store.meals) {
      for (const id of neighborhoodDeliveryMealIds) {
        if (meal.id === id) {
          neighborhoodMeals.push(meal)
        }
      }
    }

    return [...new Set(neighborhoodMeals)]

    //==== also works ===
    // return Array.from(neighborhoodMeals.reduce(function(acc, curr) {
    //   acc.set(curr, true)
    //   return acc
    // }, new Map).keys())

  }
}


  let customerId = 1

  class Customer {
    constructor(name, neighborhoodId) {
      this.name = name
      this.neighborhoodId = neighborhoodId
      this.id = customerId++
      store.customers.push(this)
    }

  deliveries(){
    const customerDeliveries = store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id
    }.bind(this))

    return customerDeliveries
  }

  meals(){
    const customerMealIds = this.deliveries().map(function(delivery) {
      return delivery.mealId
    })

    const customerMeals = []
    for (const meal of store.meals) {
      for (const id of customerMealIds) {
        if (meal.id === id) {
          customerMeals.push(meal)
        }
      }
    }
    return customerMeals
  }

  totalSpent(){
    const customerMealPrices = this.meals().map(function(meal){
      return meal.price
    })

    return customerMealPrices.reduce((total, price) => total + price,0);
  }
}


  let mealId = 1

  class Meal{
    constructor(title, price) {
      this.title = title
      this.price = price
      this.id = mealId++
      store.meals.push(this)
    }


  deliveries(){
    const mealDeliveries = store.deliveries.filter(function(delivery){
      return delivery.mealId === this.id
    }.bind(this))

    return mealDeliveries
  }

  customers(){
    const mealCustomerIds = this.deliveries().map(function(delivery) {
      return delivery.customerId
    })

    const mealCustomers = []
    for (const customer of store.customers) {
      for (const id of mealCustomerIds) {
        if (customer.id === id) {
          mealCustomers.push(customer)
        }
      }
    }
    return mealCustomers
  }

  static byPrice(){
    const sortedMeals = store.meals.sort(function(a,b){
      return (b.price) - (a.price)
    })
    return sortedMeals
  }

}


// const Delivery = (function(){
  let deliveryId = 1

  class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
      this.mealId = mealId
      this.neighborhoodId = neighborhoodId
      this.customerId = customerId
      this.id = deliveryId++
      store.deliveries.push(this)
    }


  meal(){
    const deliveryMeal = store.meals.find(function(meal){
      return this.mealId === meal.id
    }.bind(this))

    return deliveryMeal
  }

  customer(){
    const deliveryCustomer = store.customers.find(function(customer){
      return this.customerId === customer.id
    }.bind(this))

    return deliveryCustomer
  }

  neighborhood(){
    const deliveryNeighborhood = store.neighborhoods.find(function(neighborhood){
      return this.neighborhoodId === neighborhood.id
    }.bind(this))

    return deliveryNeighborhood
  }

  // return DeliveryBuilder
}
