<template>
  
  <el-row :gutter="20" class='fullHeight'>
  	<el-col :span='14' class='question-wrap'>
  	   <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <div>
            <el-tag type='success' v-loading.fullscreen.lock="fullscreenLoading">{{level}}</el-tag><el-tag type='success'>参与人数:{{total}}</el-tag><el-tag type='success'>通过人数：{{success}}</el-tag><span class="quesName">{{name}}</span>
            <!--<el-button style="float: right;" type="primary" size='small'>收藏</el-button>-->
          </div>
        </div>
        <div><el-tag><i class="el-icon-document"></i>描述</el-tag><span class="quesTit">{{descTitle}}</span></div>
        <br>
        <el-card>
          <div>{{descTxt}}</div>
        </el-card>
       </el-card>
       <el-card class='box-card'>
        <div slot="header" class="clearfix">
          <el-tag><i class="el-icon-document"></i>样例</el-tag>
        </div>
        <pre class='brush:js;smart-tab: true' v-text='example'>
        </pre>
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
import './question.less';
//import './ace.js';
//import './mode-javascript.js';
//import './theme-twilight.js';
//import './ext-language_tools.js';
import './shCoreDefault.css';
//import './shCore.js';
//import './shBrushJScript.js';
//import './shCore.css';

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
      fullscreenLoading:false,
      level:'',
      total:'',
      success:'',
      name:'',
      descTxt:'',
      example:'',
      descTitle:''
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
        //console.log(JSON.parse(response.body));

        //_this.questionDetail=JSON.parse(response.body);
        let questionDetail=JSON.parse(response.body);
        _this.level=questionDetail.level;
        _this.total=questionDetail.total;
        _this.success=questionDetail.success;
        _this.name=questionDetail.name;
        _this.descTxt=questionDetail.descTxt;
        _this.descTitle=questionDetail.descTitle;
        _this.example=questionDetail.example;
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
        setTimeout(function(){
          SyntaxHighlighter.highlight();
        },500);
  }
  
};
</script>
