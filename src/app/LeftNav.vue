<template>
  <div id="left_part">
    <el-row>
      <el-col :span="24" id="col4full">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>Javascript测试题</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">一星难度 (容易)</el-menu-item>
              <el-menu-item index="1-2">二星难度</el-menu-item>
              <el-menu-item index="1-3">三星难度</el-menu-item>
              <el-menu-item index="1-4">四星难度</el-menu-item>
              <el-menu-item index="1-5">五星难度 (困难)</el-menu-item>
            </el-menu-item-group>
          </el-submenu>  
          <el-menu-item index="4" class="statistics">
            <el-button type="primary" class="btn" v-on:click="jump2data">
              答题情况统计分析
            </el-button>
          </el-menu-item>
        </el-menu>
      </el-col>    
    </el-row>  
  </div>
</template>

<script>

  export default {
    name: 'LeftNav',
    methods:{
      jump2data:function(){
        this.$router.push('/DataAnalysis');
      }
    }
  };
</script>
