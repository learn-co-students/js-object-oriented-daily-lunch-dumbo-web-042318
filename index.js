// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let id = 0;
const incId = function(){
  return ++id;
};

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = incId()
    store.neighborhoods.push(this)
  }

  deliveries() {
    const hoodId = this.id
    return store.deliveries.filter(
      delivery => delivery.neighborhoodId === hoodId
      // function(delivery) {
      //   return delivery.id === hoodId
      // }
    )
  }

  customers() {
    const hoodId = this.id
    return store.customers.filter(
      customer => customer.neighborhoodId === hoodId
    )
  }

  meals() {
    let hoodMeals = [];


    this.deliveries().forEach(
      delivery => {
        const mealId = delivery.meal().id
        hoodMeals.push(store.meals.find(
          meal => meal.id === mealId
        ))
      }
    )

    return hoodMeals.slice(0, -1);
  }
}


class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = incId()
    store.deliveries.push(this)
  }

  meal() {
    const mealId = this.mealId
    return store.meals.find(
      meal => meal.id === mealId
    )
  }

  customer() {
    const customerId = this.customerId
    return store.customers.find(
      customer => customer.id === customerId
    )
  }

  neighborhood() {
    const neighborhoodId = this.neighborhoodId
    return store.neighborhoods.find(
      neighborhood => neighborhood.id === neighborhoodId
    )
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = incId()
    store.customers.push(this)
  }

  deliveries() {
    const customerId = this.id
    return store.deliveries.filter(
      delivery => customerId === delivery.customerId
    )
  }

  meals() {
    const mealIds = this.deliveries().map(
      delivery => delivery.mealId
    )

    // return store.meals.filter (
    //   meal => {
    //     let meal = meal
    //     mealIds.forEach(
    //       mealID => meal.id === mealId
    //     )
    //   }
    // )
    let newMeals = []

    mealIds.forEach (
        mealId => {
          let mealID = mealId
          newMeals.push(store.meals.find(
            meal => meal.id === mealID
          )
        )
      }
    )


    return newMeals;
  }

  totalSpent() {
    let total = 0;

    this.meals().forEach(
      meal => total += meal.price
    )

    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = incId()
    store.meals.push(this)
  }

  deliveries() {
    const mealId = this.id
    return store.deliveries.filter(
      delivery => mealId === delivery.mealId
    )
  }

  customers() {
    const customerIds = this.deliveries().map(
      delivery => delivery.customerId
    )
    let newCustomers = []

    customerIds.forEach (
        customerId => {
          let customerID = customerId
          newCustomers.push(store.customers.find(
            customer => customer.id === customerID
          )
        )
      }
    )


    return newCustomers;
  }


  static byPrice() {
    return store.meals.sort((meal1, meal2) => meal2.price - meal1.price)
  }

}
