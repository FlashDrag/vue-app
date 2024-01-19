<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button :disabled="itemIsInCart" @click="addToCart" class="add-to-cart">
        Add to cart
      </button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import axios from "axios";
import NotFoundPage from "./NotFoundPage";

export default {
  name: "ProductDetailPage",
  components: {
    NotFoundPage,
  },
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  methods: {
    async addToCart() {
      await axios.post("/api/users/1/cart", {
        id: this.$route.params.productId,
      });
      alert("Successfully added item to cart!");
    },
  },
  async created() {
    const response = await axios.get(
      `/api/products/${this.$route.params.productId}`
    );
    this.product = response.data;

    const cartResponse = await axios.get("/api/users/1/cart");
    this.cartItems = cartResponse.data;
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some(
        (item) => item.id === this.$route.params.productId
      );
    },
  },
};
</script>
