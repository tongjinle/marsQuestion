<template>
  <div id="root">
    <header-component :msgfromheader="headFatherSay"></header-component>
    <main class="main">
      <left-component></left-component>

      <div class="right">
        <right-component v-on:rightChildTellMe="ListenToright" v-on:isReLogin="isReLogin"></right-component> 
        
      </div>
    
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import left from './left.vue';
import right from './right.vue';
import Footer from './Footer.vue';

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'left-component': left,
    'right-component': right,
    'footer-component': Footer
  },
  data(){
    return{  
      headFatherSay:{
        logChildWords:" ",
        flag:false,
      }
      // logChildWords:"123dsf",
      // flag:true,
    }
   },

  methods:{
    ListenToright: function(msg){
       //接收到子集(right.vue)传来的用户名
      console.log(msg);
      this.headFatherSay.logChildWords=msg;
      if(msg){
        this.headFatherSay.flag=true;
        // console.log(this.flag);
      } 
    },
    isReLogin:function(msg){  //判断是否登录,修改header 和login里面的数据
      //接收到子集(right.vue)传来的是否登录
      if(msg){
        //告诉header 切换为登录状态
        this.headFatherSay.flag=false;
        

      }
    }
  }



};
</script>
