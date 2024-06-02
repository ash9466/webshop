<template>
  <div class="container">
    <Menu></Menu>
    <IndexPage></IndexPage>
  </div>
</template>

<script>
import IndexPage from './components/IndexPage.vue';
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
    IndexPage
  }
};
</script>

<style>
</style>
