<template>
  <div id="root">
    <header-component :msgfromheader="headFatherSay"></header-component>
    <main class="main">
      <left-component></left-component>
      <!-- <register-component></register-component> -->
      <div class="right">
        <login-component v-on:logChildTellMe="ListenToLog"></login-component> 
        <!--父级监听子集,收到子集传来的消息-->
        
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
  },
  data(){
    return{  
      headFatherSay:{
        logChildWords:"54desfrsde",
        flag:false,
      }
      // logChildWords:"123dsf",
      // flag:true,
    }
   },

  methods:{
    ListenToLog: function(msg){
       //接收到子集传来的用户名
      // console.log(msg);
      this.logChildWords=msg;
      if(msg){
        this.flag=true;
        console.log(this.flag);
      }
      
    }
  }



};
</script>
