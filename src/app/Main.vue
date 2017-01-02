<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <leftnav-component></leftnav-component>
      <router-view></router-view> 
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './header.vue';
import LeftNav from './leftNav.vue';
import Footer from './footer.vue';

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'leftnav-component':LeftNav,
    'footer-component': Footer
  }
};

</script>
