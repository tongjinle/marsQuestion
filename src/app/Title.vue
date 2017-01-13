<!-- <template>
  <div class="title">
    <h1 class="title-h1">'Allo, 'Allo!</h1>
    <div>
      <img class="title-logo" src="http://fountainjs.io/assets/imgs/yeoman.png"/>
      <img class="title-logo" src="http://fountainjs.io/assets/imgs/fountain.png"/>
    </div>
    <h2 class="title-h2">Always a pleasure scaffolding your apps.</h2>
  </div>
</template> -->
<template>
    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/elindex/hot">处理中心</el-menu-item>
        <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'Title'
};
</script>
