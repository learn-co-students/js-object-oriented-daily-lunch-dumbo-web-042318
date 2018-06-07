// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

  const Neighborhood = (function(){
    let id = 1;
    return class Neighborhood {
      constructor(name) {
        this.id = id++;
        this.name = name;
        store.neighborhoods.push(this);
      }

      deliveries() {
        return store.deliveries.filter( delivery => delivery.neighborhoodId === this.id)
      }

      customers() {
        return store.customers.filter( customer => customer.neighborhoodId === this.id)
      }

      meals() {
        let nonUniqMeals = this.deliveries().map(delivery => delivery.meal());

        return [...new Set(nonUniqMeals)];
      }
    }
  })();

  const Customer = (function(){
    let id = 1;
    return class Customer {
      constructor(name, neighborhoodId) {
        this.id = id++;
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
      }

      deliveries() {
        return store.deliveries.filter(delivery => delivery.customerId === this.id);
      }

      meals() {
        return this.deliveries().map(delivery => delivery.meal());
      }

      totalSpent() {
        return this.meals().reduce(
          (total, meal) => total + parseInt(meal.price)
          , 0);
      }
    }
  })();

  const Meal = (function() {
    let id = 1;
    return class Meal {
      constructor(title, price) {
        this.id = id++;
        this.title = title;
        this.price = parseInt(price);
        store.meals.push(this);
      }

      deliveries() {
        return store.deliveries.filter(delivery => delivery.mealId === this.id);
      }

      customers() {
        return this.deliveries().map(delivery => delivery.customer());
      }

      static byPrice() {
        return store.meals.sort((meal1, meal2) => meal2.price - meal1.price);
      }
    }
  })();

  const Delivery = (function(){
    let id = 1;
    return class Delivery {
      constructor(mealId, neighborhoodId, customerId) {
        this.id = id++;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this);
      }
      meal() {
        return store.meals.find(meal => meal.id === this.mealId);
      }

      customer() {
        return store.customers.find(customer => customer.id === this.customerId);
      }

      neighborhood() {
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
      }
    }
  })();
