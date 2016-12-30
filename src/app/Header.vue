<template>
  <header class="header" id="app_header">

   <p class="header_logo"><img src="http://me.hxsd.com/public/comm/assets/img/logo.png"></p>

<!--登录之前显示的-->
  <div class="register">
    <el-menu  theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    
     <!-- <el-menu-item index="1"><a v-on:click="login">登录</a></el-menu-item>-->
      <el-menu-item index="1"> 
        <el-button type="text" @click="open4">登录</el-button>
      </el-menu-item>

      <el-menu-item index="3"><a>注册</a></el-menu-item>

    </el-menu>
  </div>
 

<!--登录成功后显示的-->
  <div class="header_login">
    <div class="userImg">
      <img src="http://me.hxsd.com/public/comm/assets/img/avatar1_small.jpg">
  </div>
    
    <span>张三</span>
  </div>
   
  </header>
</template>

<script>


export default {
   name: 'Header',

    methods: {
        open4() {
          this.$msgbox({
            title: '消息',
            message: '所发生的广泛地',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            this.$message({
              type: 'info',
              message: 'action: ' + action
            });
          });
        },
      }
  }

  

</script>



