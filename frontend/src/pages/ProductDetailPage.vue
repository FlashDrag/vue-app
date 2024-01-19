<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart">Add to cart</button>
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
    };
  },
  async created() {
    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    this.product = response.data;
  }
};
</script>
