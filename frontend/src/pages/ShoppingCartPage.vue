<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length">
    <ShoppingCartList :products="cartItems" />
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-else>
    <p>Your cart is empty!</p>
  </div>
</template>

<script>
import ShoppingCartList from "@/components/ShoppingCartList";
import { cartItems } from "@/temp-data";

export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems,
    };
  },
};
</script>
