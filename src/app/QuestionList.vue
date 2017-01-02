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
  	<div class="el-col el-col-4 fullScreen">
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
  	<div class="el-col el-col-14 table-wrap">
  	<h3>全部试题</h3>
  	<el-col>
 		
	  <el-table
	    :data="tableData"
	    stripe
	    style="width: 100%">
	    <el-table-column
	      prop="date"
	      label="难度"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="类型"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="详细">
	    </el-table-column>
	  </el-table>

  	</el-col>
  	</div>
  	<div class="el-col el-col-6 person-info">
  		<el-card class='box-card'>
  			<div class="person-logo">
  				
  			</div>
  			<p>姓名：xxxx</p>
  			<p>学号：546516564654</p>
  			<p>成绩：xxxx</p>
  		</el-card>
  		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 36px;">难度分类</span>
		  </div>
		  <div>简单：100题</div>
		  <div>中等：100题</div>
		  <div>困难：100题</div>
		</el-card>
  	</div>
  	
  </el-row>
  
  
</template>

<script>
export default {
  name: 'Title',
  data() {
      return {
        tableData: [{
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        }, {
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        }, {
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        }, {
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        },{
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        },{
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        },{
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        },{
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        },{
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        },{
          date: '容易',
          name: 'HTML',
          address: '块级元素的特征'
        }]
      }
    }
  
  
  /*methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }*/
  
};
</script>
