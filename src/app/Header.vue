<template>
  <header class="header">

   <p class="header_logo"><router-link to="/"><img src="http://me.hxsd.com/public/comm/assets/img/logo.png"></router-link></p>

<!--登录之前显示的-->
  <div class="reg" v-if="flag">
    <el-menu  theme="dark" default-active="1" class="el-menu-demo" mode="horizontal">
    
      <el-menu-item index="1"><router-link to="/login">登录</router-link></el-menu-item>
<!-- <el-menu-item index="1">登录</el-menu-item> -->
    </el-menu>
  </div>
 

<!--登录成功后显示的-->
  <div class="header_login" v-if="!flag">
    <div v-on:mouseenter="seen=true">
      <span>{{msgFromHeader}}</span><!--v-text="msgFromHeader"-->
      <i></i>
    </div> 

    <div class="seen1" v-show="seen">
      <ul v-on:mouseleave="seen=false">
        <li><router-link to="/">个人中心</router-link></li>
        <li><router-link to="/changePassword">修改密码</router-link></li>
        <li><router-link to="/">退出</router-link></li>
      </ul>
    </div> 

  </div>
   
  </header>
  
</template>

<script>
  export default {
   name: 'Header',

  data(){
    return{    
     seen:false,      
    }
  },
  props: ["msgFromHeader"],  //接收父级传来的消息
   
  methods:{
    
  }




  }



</script>



