<template>
  <!--<div class="title">
    <h1 class="title-h1">'Allo, 'Allo!</h1>
    <div>
      <img class="title-logo" src="http://fountainjs.io/assets/imgs/yeoman.png"/>
      <img class="title-logo" src="http://fountainjs.io/assets/imgs/fountain.png"/>
    </div>
    <h2 class="title-h2">Always a pleasure scaffolding your apps.</h2>
  </div>-->
  <el-row :gutter="20" class='fullHeight'>
  	<div class="el-col el-col-2 fullScreen">
	    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
	      <el-submenu index="1">
	        <template slot="title">HTML</template>
	        <el-submenu index="1-1">
	          <template slot="title">选项4</template>
	          <el-menu-item index="1-1-1">选项1</el-menu-item>
	        </el-submenu>
	        <el-submenu index="1-2">
	          <template slot="title">选项4</template>
	          <el-menu-item index="1-2-1">选项1</el-menu-item>
	        </el-submenu>
	        <el-submenu index="1-3">
	          <template slot="title">选项4</template>
	          <el-menu-item index="1-3-1">选项1</el-menu-item>
	        </el-submenu>
	      </el-submenu>
	      <el-menu-item index="2">CSS</el-menu-item>
	      <el-menu-item index="3">JAVASCRIPT</el-menu-item>
	    </el-menu>
  	</div>
  	<el-col :span='10' class='question-wrap'>
  	   <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">[容易]递归</span>
          <el-button style="float: right;" type="primary">收藏</el-button>
        </div>
        <div>请用javascript完成下列要求</div>
        <div>输入数字n，返回n！的值</div>
       </el-card>
       <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">标签</span>
        </div>
        <div class='tags'>
          <el-button style="float: left;" type="success">递归</el-button>
          <el-button style="float: left;" type="success">javascript</el-button>
          <el-button style="float: left;" type="success">经典题目</el-button>
        </div>
       </el-card>
  	</el-col>
  	<el-col :span='10' class='question-wrap'>
       <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">输入代码</span>
          <el-button style="float: right;" type="success">提交代码</el-button>
        </div>
        <textarea class="input-wrap"></textarea>
       </el-card>
    </el-col>
  	
  </el-row>
  
  
</template>

<script>
export default {
  name: 'Title',
};
</script>
