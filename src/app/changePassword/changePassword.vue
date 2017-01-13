<template>
  <div id="root">
    <header-component ></header-component>
    <main class="main">
      <left-component></left-component>
      <!-- <register-component></register-component> -->
      <div class="right">
        <change-component></change-component>
        
      </div>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from '../Header.vue';
import left from '../left.vue';
import change from './change.vue';
import Footer from '../Footer.vue';

export default {
  name: 'changePassword',
  components: {
    'header-component': Header,
    'left-component': left,
    'change-component': change,
    'footer-component': Footer
  }





};
</script>
