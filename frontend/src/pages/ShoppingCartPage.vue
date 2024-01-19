<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length">
    <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-else>
    <p>Your cart is empty!</p>
  </div>
</template>

<script>
import axios from "axios";
import ShoppingCartList from "@/components/ShoppingCartList";

export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    async removeFromCart(productId){
      const response = await axios.delete(`/api/users/1/cart/${productId}`);
      this.cartItems = response.data;
    },
  },
  async created() {
    const response = await axios.get('/api/users/1/cart');
    this.cartItems = response.data;
  }
};
</script>
