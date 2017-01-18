<template>
  <div id="left_part">
    <el-row>
      <el-col :span="24" id="col4full">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>Javascript测试题</template>
            <el-menu-item-group >
              <el-menu-item v-for="diff in diffLevelList" :index="diff.diff+''" ><router-link :to="'/questionList/'+diff.diff">{{diff.level}}</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>  
          <el-menu-item index="4" class="statistics">
            <el-button type="primary" class="btn" @click="goQuesList(112)">
              答题情况统计分析
            </el-button>
          </el-menu-item>
        </el-menu>
      </el-col>    
    </el-row>  
  </div>
</template>

<script>
  import './LeftNav.less';
  import CONFIG from './config.js';
  export default {
    name: 'LeftNav',
    data(){
      return {diffLevelList:CONFIG.diffLevelList};
    },
    methods:{
      jump2data(){
        this.$router.push('/Content');
      },
      goQuesList(diff){
        this.$router.push(`/questionList/${diff}`);
      },
      selectMenu(key,keyPath){
        console.log(key,keyPath);
        let [keyIndex,diff] = keyPath;
        if(keyIndex==1  ){
          this.goQuesList(diff);
        }
      }

    }
  };
</script>
