<template>
  <div id="root">
    <header-component></header-component>
    <main class="main">
      <left-component></left-component>
      <!-- <register-component></register-component> -->
      <div class="right">
        <login-component></login-component>
        
      </div>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from '../Header.vue';
import left from '../left.vue';
import log from './log.vue';
import Footer from '../Footer.vue';

export default {
  name: 'login',
  components: {
    'header-component': Header,
    'left-component': left,
    'login-component': log,
    'footer-component': Footer
  }
};
</script>
