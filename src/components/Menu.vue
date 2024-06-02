<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
    <a class="navbar-brand text-cosmic-latte" href="#">Webshop</a>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Menu',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Belleza&display=swap');

.navbar {
  font-family: 'Belleza', sans-serif;
  background-color: #333; /* Black */
}

.navbar-brand {
  color: #F8F4E3 !important; /* Cosmic latte */
}
</style>
