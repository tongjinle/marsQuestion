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
            <el-tag type='success' v-loading.fullscreen.lock="fullscreenLoading">难度1</el-tag><el-tag type='success'>参与人数:100</el-tag><el-tag type='success'>通过人数：30</el-tag><span>递归算法</span>
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
       <div v-if='isCommit'>
          <el-alert
            :title="successTxt+speed"
            type="success"
            :closable="false"
            show-icon
            v-if='isPass'>
          </el-alert>
          <el-alert
            :title="failTxt"
            type="error"
            :closable="false"
            show-icon
            v-if='!isPass'>
          </el-alert>
       </div>
      
  	</el-col>
  	<el-col :span='10' class='question-wrap'>
       <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <span>输入代码</span>
          <div><el-tag type='success'>按Ctrl+Shift+Space开启代码提示</el-tag><el-button style="float: right;" type="success" size='small' @click='getValue'>提交代码</el-button></div>
        </div>
        <pre id='editor'></pre>
       </el-card>
    </el-col>
  </el-row>
  
</template>
<script>
export default {
  name: 'Title',
  data(){
    return{
      txt:'',
      speed:'0.5s',
      isCommit:false,
      isPass:false,
      successTxt:'运行成功，用时',
      failTxt:'啊哦，代码报错了，再检查检查',
      questionDetail:null,
      fullscreenLoading:false
    }
  },
  methods:{
    getValue:function(){
      let editor = ace.edit("editor");
      this.txt=editor.getValue();
      console.log(this.txt);
    },
    getQuestion:function(){
      this.openFullScreen();
      let Mock=true;
      let url='';
      Mock?url='./questionDetail.json':'';
      let _this=this;
      _this.$http.get(url).then((response) => {
        console.log(JSON.parse(response.body));
        _this.questionDetail=JSON.parse(response.body);
        console.log(_this.questionDetail.level);
        console.log(typeof(_this.questionDetail));
        this.closeFullScreen();
      })
    },
    commitCode:function(){
      let _this=this;
      getValue();
      let url='/commitCode';
      _this.$http.post(url,{
        token:_this.token,
        name:_this.name,
        code:_this.txt
      }).then((response) => {
        _this.speed=response.body.speed;
        _this.isPass=response.body.isPass;
      })
    },
    openFullScreen() {
        this.fullscreenLoading = true;
    },
    closeFullScreen() {
        this.fullscreenLoading = false;
    }
  },
  mounted(){
        
        var editor = ace.edit("editor");
        var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
        editor.session.setMode(new JavaScriptMode());
        editor.setTheme("ace/theme/twilight");
        editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
        });
        this.getQuestion();
  }
  
};
</script>
