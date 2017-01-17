<template>
  <div id="root">

    <div class="model" v-if="loading"><img src="images/Loading.gif"></div><!--模态层-->
    <header-component :msgfromheader="headFatherSay"></header-component>
    <main class="main">
      <leftnav-component></leftnav-component>

      <div class="right">
        <right-component v-on:rightChildTellMe="ListenToright" v-on:isReLogin="isReLogin" 
        v-on:myLogin="myLogin"></right-component> 
        
      </div>
    

    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';

import LeftNav from './LeftNav.vue';


import right from './right.vue';

import Footer from './Footer.vue';


export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'leftnav-component':LeftNav,
    'right-component': right,
    'footer-component': Footer
  },
  data(){
    return{  
      headFatherSay:{
        logChildWords:" ",
        flag:false,
      } ,
      LogOut:false,
      loading:false   
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
    },
    myLogin:function(msg){  //点击了登录,出模态层
      // console.log(msg);
      if(msg==true){
        this.loading=true;
      }else{
        this.loading=false;
      }
    }
  }



};

</script>
