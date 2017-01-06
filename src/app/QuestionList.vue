<template>
  <el-row :gutter="20" class='fullHeight'>
  	<div class="el-col el-col-4 fullScreen">
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
  	<div class="el-col el-col-14 table-wrap">
  	<el-col>
    <el-card>
      <div class="chooseLevelWrap">
        <el-radio-group fill='#20a0ff' v-model='chooseLevel' @change>
          <el-radio-button label="难度1"></el-radio-button>
          <el-radio-button label="难度2"></el-radio-button>
          <el-radio-button label="难度3"></el-radio-button>
          <el-radio-button label="难度4"></el-radio-button>
          <el-radio-button label="难度5"></el-radio-button>
        </el-radio-group>
        <el-checkbox v-model="isFilterPass" checked>是否显示已通过题目</el-checkbox>
      </div>
        
        <!--<el-select v-model="isPass" placeholder="请选择">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>-->
        <el-alert
          v-if='chooseLevel==""'
          title="选个难度吧~"
          type="info"
          :closable="false">
        </el-alert>
        <el-alert
          v-if='chooseLevel=="难度1"'
          title="先来个简单的练练手~"
          type="success"
          :closable="false">
        </el-alert>
        <el-alert
          v-if='chooseLevel=="难度2"'
          title="加点难度~"
          type="info"
          :closable="false">
        </el-alert>
        <el-alert
          v-if='chooseLevel=="难度3"'
          title="技术不错哦~"
          type="warning"
          :closable="false">
        </el-alert>
        <el-alert
          v-if='chooseLevel=="难度4"'
          title="这个有点难咯~"
          type="info"
          :closable="false">
        </el-alert>
        <el-alert
          v-if='chooseLevel=="难度5"'
          title="离大牛不远了~"
          type="error"
          :closable="false">
        </el-alert>
        <el-button type='primary' style='margin-top:3px'>搜索</el-button>
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
export default {
  name: 'Title',
  data() {
      return {
        pageSize:5,
        pageIndex:1,
        total:10,
        pageSizes:[5,10,15,20],
        tableData:null,
        chooseLevel:'',
        currentLevel:'',
        tableLoading:true,
        isFilterPass:null
        /*options: [{
          value: '全部',
          label: '全部'
        }, {
          value: '已通过',
          label: '已通过'
        }, {
          value: '未通过',
          label: '未通过'
        }],
        isPass:''*/
      }
    },
    methods: {
      sizeChange: function (pageSize) {
            this.pageSize = pageSize;
      },
      pageIndexChange: function (pageIndex) {
            this.pageIndex = pageIndex;
      },
      getQuestionList:function(type){
            this.tableLoading=true;
            var url='';
            if(type=='searchLevel'){
              url='/questionList?diff='+this.chooseLevel;
            }else if(type=='pageChange'){
              url='/questionList?diff='+this.currentLevel+'&pageIndex'+this.pageIndex;
            }else if(type=='mounted'){
              url='/questionList?mounted=true';
            }
            var _this=this;
            var Mock=true;
            Mock?url='./questionList.json':'';
            this.$http.get(url).then(
              (response) => {
              _this.tableData=eval(response.body);
              _this.tableLoading=false;
              _this.currentLevel=eval(response.body.diff);
            })
      },
      goQuestion:function(questionName){
            let name=questionName;
            router.go({name:'questionDetail',params:{name:name}});
      }
    },  
    mounted(){
        this.getQuestionList();
    }

};
</script>
