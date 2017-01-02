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
import Header from './header.vue';
import LeftNav from './leftNav.vue';
import Footer from './footer.vue';
import Content from './content.vue';

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