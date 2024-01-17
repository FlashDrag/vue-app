<template>
  <NavBar />
  <div class="page-wrap">
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>
