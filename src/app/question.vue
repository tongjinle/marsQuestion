<template>
  <el-row :gutter="20" class='fullHeight'>
  	<div class="el-col el-col-2 fullScreen">
	    <el-menu default-active="2" class="el-menu-vertical-demo" theme="dark">
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
  	<el-col :span='12' class='question-wrap'>
  	   <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <div>
            <el-tag type='success'>难度1</el-tag><span>递归算法</span>
            <el-button style="float: right;" type="primary" size='small'>收藏</el-button>
          </div>
        </div>
        <div><el-tag><i class="el-icon-document"></i>描述</el-tag>请用javascript完成下列要求：</div>
        <br>
        <el-card>
          <div>输入一个正整数n,输出n！的值</div>
        </el-card>
       </el-card>
       <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <el-tag><i class="el-icon-document"></i>样例</el-tag>
        </div>
        <div class='example'>
          function a(n){...};<br>
          a(2);//结果为4
        </div>
       </el-card>
  	</el-col>
  	<el-col :span='10' class='question-wrap'>
       <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <span>输入代码</span>
          <el-button style="float: right;" type="success">提交代码</el-button>
        </div>
        <pre id='editor'>
          function foo(items) {
            var i;
            for (i = 0; i &lt; items.length; i++) {
                alert("Ace Rocks " + items[i]);
            }
          }
        </pre>
       </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'Title',
};
</script>
