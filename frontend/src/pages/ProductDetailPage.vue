<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button v-if="user" :disabled="itemIsInCart" @click="addToCart" class="add-to-cart">
        {{ itemIsInCart ? "Item is already in cart": "Add to cart"}}
      </button>
      <button v-if="!user" class="sign-in" @click="signIn">Sign in to add to cart</button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";

export default {
  name: "ProductDetailPage",
  props: ["user"],
  components: {
    NotFoundPage,
  },
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        this.cartItems = cartResponse.data;
      }
    }
  },
  methods: {
    async addToCart() {
      await axios.post(`/api/users/${this.user.uid}/cart`, {
        id: this.$route.params.productId,
      });
      alert("Successfully added item to cart!");
    },
    async signIn() {
      const email = prompt("Please enter your email to sign in:");
      const auth = getAuth();
      const actionCodeSettings = {
        url: `http://localhost:8080/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("A login link was sent to the email you provided");
      window.localStorage.setItem("emailForSignIn", email);
    },
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      await signInWithEmailLink(auth, email, window.location.href);
      alert("Successfully signed in!");
      window.localStorage.removeItem("emailForSignIn");
    }

    const response = await axios.get(
      `/api/products/${this.$route.params.productId}`
    );
    this.product = response.data;

    if (this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      this.cartItems = cartResponse.data;
    }
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
