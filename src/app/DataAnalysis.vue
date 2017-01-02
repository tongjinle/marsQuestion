<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <leftnav-component></leftnav-component>
      <content-component></content-component>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import LeftNav from './LeftNav.vue';
import Footer from './Footer.vue';
import Content from './Content.vue';

export default {
  name: 'DataAnalysis',
  components: {
    'header-component': Header,
    'leftnav-component':LeftNav,
    'content-component':Content,
    'footer-component': Footer,
  }
};

</script>