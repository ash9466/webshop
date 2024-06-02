<template>
  <div class="IndexPage container mt-4">
    <div class="row">
      <div class="col-md-9">
        <h2 class="mb-4 text-black">Products</h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col d-flex align-items-stretch" v-for="(product, id) in list_products" :key="id">
            <div class="card h-100 shadow-sm rounded product-card">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-cosmic-latte">{{ product.name }}</h5>
                <p class="card-text text-muted">{{ product.desc }}</p>
                <p class="card-text text-cosmic-latte fw-bold mt-auto">{{ product.price }} €</p>
                <button type="button" class="btn btn-redwood btn-sm mt-2" v-on:click="add_to_cart(product._id)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card mb-4 shadow-sm rounded">
          <div class="card-body">
            <h5 class="card-title text-cosmic-latte">Cart</h5>
            <div class="list-group">
              <div class="list-group-item" v-for="(value, id) in list_cart" :key="id">
                <div>
                  {{ get_info_product(id) }}
                  <h6 class="mb-1 text-cosmic-latte">{{ desc_product.name }}</h6>
                  <small class="text-muted">Quantity: {{ value }}</small>
                </div>
                <button type="button" class="btn btn-outline-cosmic-latte btn-sm mt-2" v-on:click="remove_from_cart(id)">Remove</button>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <h6 class="text-cosmic-latte">Total: {{ total_price }} €</h6>
            <h6 class="text-cosmic-latte">Number of Products: {{ nbr_product }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Cart } from '../manager';

export default {
  name: 'IndexPage',
  data: function () {
    return {
      stock: [],
      cart: new Cart(),
      list_products: [],
      list_cart: {},
      desc_product: {},
      total_price: 0,
      nbr_product: 0
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:5001/api/products')
        .then(response => {
          this.list_products = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    add_to_cart(id) {
      this.cart.addInCart(id);
      this.update_cart();
    },
    get_info_product(id) {
      this.desc_product = this.list_products.find(product => product._id === id) || {};
    },
    update_cart() {
      this.list_cart = this.cart.get_list_cart();
      this.update_total();
    },
    update_total() {
      this.total_price = this.cart.get_total_price({
        get_prod_by_id: id => this.list_products.find(product => product._id === id)
      });
      this.nbr_product = this.cart.get_nbr_product();
    },
    remove_from_cart(id) {
      this.cart.removeFromCart(id);
      this.update_cart();
      this.update_total();
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Belleza&display=swap');

body {
  background-color: #F8F4E3; /* Beige background */
  font-family: 'Belleza', sans-serif;
  color: #000000;
}

.container {
  max-width: 1200px;
}

.card {
  border-radius: 0.5rem;
  border: 1px solid #B0413E; /* Redwood */
  background-color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn-redwood {
  background-color: #B0413E; /* Redwood */
  border: none;
  color: #F8F4E3; /* Cosmic latte */
}

.btn-outline-cosmic-latte {
  border: 1px solid #F8F4E3; /* Cosmic latte */
  color: #F8F4E3; /* Cosmic latte */
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #444;
  border: none;
  color: #F8F4E3; /* Cosmic latte */
}

.card-footer {
  background-color: #222;
  border-top: 1px solid #B0413E; /* Redwood */
  color: #F8F4E3; /* Cosmic latte */
}

.product-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-cosmic-latte {
  color: #F8F4E3;
}

.text-black {
  color: #000000; /* Black */
}
</style>
