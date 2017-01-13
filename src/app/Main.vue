<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <leftnav-component></leftnav-component>
      <right-component></right-component>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import LeftNav from './LeftNav.vue';
import Footer from './Footer.vue';
import Right from './Right.vue';

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'leftnav-component':LeftNav,
    'right-component':Right,
    'footer-component': Footer
  }
};

</script>
