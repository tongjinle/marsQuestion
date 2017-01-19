<template>
  <el-row :gutter="24" class='fullHeight'>
  	<div class="el-col el-col-18 table-wrap">
  	<el-col>
    <el-card>
      <div class="chooseLevelWrap">
        <el-radio-group fill='#20a0ff' v-model='chooseLevel' @change='getQuestionList("searchLevel")'>
          <el-radio-button 
          v-for='questionLevel in questionLevels'
          :label="questionLevel.level"
          >
          </el-radio-button>
        </el-radio-group>
        <el-checkbox v-model="isFilterPass" checked @change='getQuestionList("searchLevel")'>已通过</el-checkbox>
      </div>
        <el-alert
          v-for='questionLevel in questionLevels'
          v-if='chooseLevel==questionLevel.level'
          :title='questionLevel.title'
          :type="questionLevel.type"
          :closable="false"
          >
        </el-alert>
    </el-card>
    <el-card class='box-card table-card'>
    <h3>Javascript试题</h3>
    <el-table
    v-loading="tableLoading"
    element-loading-text="拼命加载中"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
        label="状态"
        width="100"
        inline-template>
          <template>
            <el-tag :type="row.tag==='已通过'?'success':'danger'">{{row.tag}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="info"
        label='题目'>
      </el-table-column>
      <el-table-column
        label='难度'
        width='100'
        inline-template>
        <template>
          <el-tag>
            {{row.level}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label='通过率'
        width='80'
        inline-template>
        <template>
        <el-popover trigger="hover" placement="top">
        <p>通过<s style="color:#13CE66">{{row.pass}}</s>/未通过<s style="color:#FF4949">{{row.fail}}</s></p>
        <div slot="reference">
          <el-tag>{{parseInt((row.pass/(row.pass+row.fail))*100)+'%'}}</el-tag>
        </div>  
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label='操作'
        width='100'
        inline-template>
        <template>
          <el-button type='success' size='small' @click='goQuestion(row.info)'>开始答题</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
      layout="prev, pager, next"
      v-bind:current-Page="pageIndex" v-bind:page-size="pageSize" :total="total" v-bind:page-sizes="pageSizes"
      v-on:size-change="sizeChange" v-on:current-change="pageIndexChange">
      </el-pagination>
    </div>
    
    </el-card>
  	</el-col>
  	</div>
  	<div class="el-col el-col-6 person-info">
    <el-col>
  		<el-card class='box-card'>
  			<div class="person-logo">
  			</div>
  			<p>姓名：<span>xxxx</span></p>
  			<p>学号：<span>546516564654</span></p>
  			<p>正确率：<span>xxxx</span></p>
  		</el-card>
  	<el-card class="box-card levelList">
		  <div slot="header" class="clearfix">
		    难度分类
		  </div>
		  <p><el-tag type='success'>难度1</el-tag><i>100题</i></p>
		  <p><el-tag type='success'>难度2</el-tag><i>100题</i></p>
		  <p><el-tag type='primary'>难度3</el-tag><i>100题</i></p>
      <p><el-tag type='danger'>难度4</el-tag><i>100题</i></p>
      <p><el-tag type='danger'>难度5</el-tag><i>100题</i></p>
		</el-card>
    </el-col>
  	</div>
  </el-row>
</template>
<script>
import './QuestionList.less';
import CONFIG from './config.js';
// import './app/shCore.css';
export default {
  name: 'Title',
  data() {
      return {
        pageSize:5,
        pageIndex:1,
        total:10,
        pageSizes:[5,10,15,20],
        tableData:null,
        chooseLevel:'一星',
        diff:'',
        tableLoading:true,
        isFilterPass:null,
        token:null,
        currentFilterPass:null,
        questionLevels:CONFIG.diffLevelList
      }
    },
    props:['isLogin'],
    methods: {
      sizeChange: function (pageSize) {
            this.pageSize = pageSize;
      },
      pageIndexChange: function (pageIndex) {
            this.pageIndex = pageIndex;
      },
      getQuestionList:function(type,diff){
            //console.log(this.chooseLevel);
            //console.log(this.isFilterPass);
            let url='http://localhost:5050';
            let _this=this;
            this.tableLoading=true;
            
            if(type==='searchLevel'){
              url+='/getQuesList?diff='+this.chooseLevel+'&token='+_this.token+'&isFilterPass='+_this.isFilterPass;
            }else if(type==='pageChange'){
              url+='/getQuesList?diff='+this.chooseLevel+'&pageIndex='+this.pageIndex+'&token='+_this.token+'&isFilterPass='+_this.isFilterPass;
            }else if(type==='mounted'){
              url+='/getQuesList?diff=level1&token='+_this.token+'&isFilterPass='+_this.isFilterPass+'&pageIndex='+this.pageIndex+'&pageSize='+this.pageSize;
            }
            let Mock=true;
            Mock?url='./questionList.json':'';
            
            
            this.$http.get(url).then(
              (response) => {
              _this.tableData=JSON.parse(response.body);
              _this.tableLoading=false;
              //_this.currentLevel=JSON.parse(response.body.diff);
            })
      },
      goQuestion:function(questionName){
            let name=questionName;
            this.$router.push({path:'/question',query:{questionName}});
      }
    },  
    mounted(){
        console.log(this.isLogin);
        //console.log(this.$route.query.diff);
        this.getQuestionList('mounted');
    }

};
</script>
