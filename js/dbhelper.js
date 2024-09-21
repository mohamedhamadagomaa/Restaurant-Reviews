/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    return `./data/restaurants.json`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const restaurants = json.restaurants;
        callback(null, restaurants);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a  type with proper error handling.
   */
  static fetchRestaurantBytype(type, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given  type
        const results = restaurants.filter(r => r.type == type);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a place with proper error handling.
   */
  static fetchRestaurantByplace(place, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given place
        const results = restaurants.filter(r => r.place == place);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a type and a place with proper error handling.
   */
  static fetchRestaurantBytypeAndplace(type, place, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants;
        if (type != 'all') { // filter by type
          results = results.filter(r => r.type == type);
        }
        if (place != 'all') { // filter by place
          results = results.filter(r => r.place == place);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all places with proper error handling.
   */
  static fetchplaces(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all places from all restaurants
        const places = restaurants.map((v, i) => restaurants[i].place);
        // Remove duplicates from places
        const uniqueplaces = places.filter((v, i) => places.indexOf(v) == i);
        callback(null, uniqueplaces);
      }
    });
  }

  /**
   * Fetch all types with proper error handling.
   */
  static fetchtypes(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all types from all restaurants
        const types = restaurants.map((v, i) => restaurants[i].type);
        // Remove duplicates from types
        const uniquetypes = types.filter((v, i) => types.indexOf(v) == i);
        callback(null, uniquetypes);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`./img/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   */
   static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      // icon: '/img/css.svg'
      });
      marker.addTo(newMap);
    return marker;
  }
}
