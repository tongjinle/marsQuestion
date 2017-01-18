<template>
  <div id="right_part">
    <el-row :gutter="20">
      <el-col :span="16" class="midd_outer">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="card-box">
              <strong>题目难度范围选择:</strong><br><br>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-select v-model="diff_from" placeholder="筛选难度等级">
                    <el-option v-for="item in diffLevelList" :label="item.level" 
                    :value="item.level"
                    >
                    </el-option>
                  </el-select>
                </el-col> 
                <el-col :span="12">
                  <el-select v-model="diff_to" placeholder="筛选难度等级"
                   :disabled="diff_from==''"
                  >
                    <el-option v-for="item in diffLevelList" :label="item.level" 
                    :value="item.level">
                    </el-option>
                  </el-select>
                </el-col> 
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="card-box">
              <el-row :gutter="20">
                <el-col :offset="3" :span="21">
                  <strong>统计时间跨度选择:</strong><br><br>
                  <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="start_end_date"
                    type="daterange"
                    placeholder="选择日期范围"
                    @change="handle_date"
                    >
                  </el-date-picker>
                </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="class_student_wrap">
          <el-col :span="4">
            <el-select v-model="selected_type" placeholder="查询方式" 
              @change="select_which_type"
            >
              <el-option v-for="item in select_types" :label="item" 
              :value="item">
              </el-option>
            </el-select>    
          </el-col>
          <el-col :span="20" v-show="type_flag">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-select v-model="selected_class" 
                placeholder="请选择班级"
                @change="add_class_tag(selected_class)"
                >
                  <el-option v-for="item in which_class" :label="item" 
                  :value="item">
                  </el-option>
                </el-select>    
              </el-col>
              <el-col :span="10">
                <el-tag
                  :closable="false"
                  type=""
                >
                已选择　：
                </el-tag>　
                <el-tag
                  v-for="tag in class_tags"
                  :closable="true"
                  :type="tag.type"
                  :key="tag"
                  :close-transition="false"
                  @close="handleClassClose(tag)"
                >
                {{tag.name}}
                </el-tag>
              </el-col> 
              <el-col :span="6">
                <el-button type="primary" 
                @click="search_class_info"
                :disabled="!(selected_type!='' && selected_class != '' && diff_from != '' && diff_to!= '' && start_end_date != '')"
                >
                查询班级</el-button>
                 <el-button
                  type="silver"
                  icon="delete"
                  size="mini"
                  class="clear_btn"
                  @click="clear_class_arr"
                  >
                  清空班级
                </el-button>  
              </el-col>  
            </el-row>    
          </el-col>
          <el-col :span="20" v-show="selected_type==''?false:!type_flag">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-select v-model="selected_class" 
                placeholder="请选择班级"
                @change="getStudentFromThisClass(selected_class)"
                >
                  <el-option v-for="item in which_class" :label="item" 
                  :value="item">
                  </el-option>
                </el-select>      
              </el-col>
              <el-col :span="5">
                <el-select v-model="selected_student" 
                @change="add_student_tag(selected_student)"
                placeholder="请选择学生">
                  <el-option v-for="item in which_student" :label="item" 
                  :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-tag
                  :closable="false"
                  type=""
                >
                已选择　：
                </el-tag>　
                <el-tag
                  v-for="tag in student_tags"
                  :closable="true"
                  :type="tag.type"
                  :key="tag"
                  :close-transition="false"
                  @close="handleStudentClose(tag)"
                >
                {{tag.name}}
                </el-tag>
              </el-col> 
              <el-col :span="6">
                <el-button type="primary" 
                @click="search_student_info"
                :disabled="!(selected_type!='' && selected_class != '' && diff_from != '' && diff_to!= '' && start_end_date != '' && selected_student != '')"
                >
                查询学生</el-button> 
                <el-button
                  type="silver"
                  icon="delete"
                  size="mini"
                  class="clear_btn"
                  @click="clear_student_arr"
                  >
                  清空学生
                </el-button>   
              </el-col> 
            </el-row>    
          </el-col>
        </el-row>
        <el-card class="box-card">
           <div id="fig4self" v-show="flag4whichAnalysis"></div>
          <div id="fig" v-show="!flag4whichAnalysis"></div>
        </el-card>
      </el-col>
      <el-col :span="7" class="right_outer"> 
        <div id="info">
          <el-row :gutter="20">
            <el-col :span="20" class="info_item head_pic"><img src="http://img.zcool.cn/community/01e50a55bee3b66ac7253f361e874b.jpg"></el-col>
          </el-row>  
          <el-row>
            <el-col :offset="3" :span="15" class="info_item"><span>用户名　：</span>  {{profile.name}}</el-col>
          </el-row>  
          <el-row>
            <el-col :offset="3" :span="15" class="info_item"><span>班级　　：</span>  {{profile.className}}</el-col>
          </el-row>  
          <el-row>
            <el-col :offset="3" :span="15" class="info_item"><span>平均得分：</span>  {{profile.evaluate}}</el-col>
          </el-row>  
        </div>   
        <el-card class="card-box self_analysis">
          <div slot="header" class="clearfix">
            <el-row :gutter="20">
              <el-col :offset="2" :span="12">
                <strong style="line-height: 25px;">个人成绩统计</strong>  
              </el-col>
              <el-col :offset="1" :span="9">
                <el-button type="blue" size="small"
                @click="generateFigSelf"
                >
                个人成绩图表
                </el-button>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20">
            <el-col :offset="1" :span="10" class="con_list">
              班级排名: {{self_analysis_conclusion[0]}}  
            </el-col>
            <el-col :offset="1" :span="10" class="con_list">
              班级人数: {{self_analysis_conclusion[1]}}  
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
          <el-row :gutter="20" class="row_top">
            <el-col :offset="1" :span="10" class="con_list">
              年级排名: {{self_analysis_conclusion[2]}}  
            </el-col> 
            <el-col :offset="1" :span="10" class="con_list">
              年级人数: {{self_analysis_conclusion[3]}}  
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
          <template>
            <el-table
              :data="self_analysis"
              stripe
              style="width: 100%">
              <el-table-column
                prop="diff"
                label="难度"
                class="txt_center"
               >
              </el-table-column>
              <el-table-column
                prop="accuracy"
                label="正确率"
                class="txt_center"
                >
              </el-table-column>
            </el-table>
          </template>
        </el-card>
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import './Content.less';
import echarts from 'echarts';
import CONFIG from './config.js';
export default {
  name: 'Content',
  data() {
    return {
      diffLevelList:CONFIG.diffLevelList, //难度分级数据
      which_class:null,           //渲染class下拉菜单的class数据
      class_tags:[],              //选择好的待查询class数组
      which_student:null,         //渲染student下拉菜单的student数据
      student_tags:[],            //选择好的待查询student数组
      diff_from:'',               //难度起点
      diff_to:'',                 //难度终点
      selected_class:'',          //class下拉菜单 当前值
      selected_type:'',           //查询方式下拉菜单 当前值
      selected_student:'',        //student下拉菜单 当前值
      start_end_date:'',          //时间起点终点
      start_date:null,            //起点时间点 (毫秒)
      end_date:null,              //终止时间点 (毫秒)
      self_analysis_pics_data_arr:[],
      color:["primary","success","warning","danger","gray","blue"],
      profile:{                   
        imgsrc:"http://img.zcool.cn/community/01e50a55bee3b66ac7253f361e874b.jpg",
        name:"XXX",
        className:"1601期",
        evaluate:"C"
      },
      type_flag:false,
      params:{                      //构建基础数据包---待发送
        timeRange:{
          begin:this.start_date,
          end:this.end_date
        },
        diffRange:{
          begin:this.diff_from,
          end:this.diff_to
        },
        type:null,
        keyList:null
      },
      analysisData:{},             //最终返回的分析数据
      self_analysis:[],
      self_analysis_conclusion:[],
      x_axis:[],
      star1:[],
      star2:[],
      flag4whichAnalysis:false
    }
  },
  computed:{
    //------难度低值选定后,删选高值范围  filter函数------------------------------
    diff_range:function(){
      var isToIndex;
      this.hard_level.find((obj,i)=>{
        if(obj.label==this.diff_to){
          isToIndex =i;
          return true
        }
      })
      
      var new_hard_level=[];
      var isFromIndex;
      this.hard_level.find((obj, i) => {        //ES6
        if (obj.label == this.diff_from) {
          isFromIndex = i;
          return true;
        }
      });

      if(this.diff_from!='' && this.diff_to==''){
        this.diff_to=this.diff_from;
      }

      if(isToIndex<isFromIndex){
        this.diff_to=this.diff_from;
      }

      for(var i=0;i<this.hard_level.length;i++){
        if(i>=isFromIndex){
          new_hard_level.push(this.hard_level[i]);
        }
      }
      return new_hard_level;
    }
  },
  watch:{
    "x_axis":function(){ 
      //--------------------------------------------------------------------
      //----echats part ----------------
      var myChart= echarts.init(document.getElementById("fig"));
      var option = {
          tooltip: {
              trigger: 'axis'
          },
          toolbox: {
              feature: {
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          legend: {
              data:['1星','2星']
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.x_axis
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '1星',
                  min: 0,
                  max: 100,
                  interval: 10,
                  axisLabel: {
                      formatter: '{value} %'
                  }
              }
          ],
          series: [
              {
                  name:'1星',
                  type:'bar',
                  data:this.star1
              },
              {
                  name:'2星',
                  type:'bar',
                  data:this.star2
              },
             
          ]
      };
      myChart.setOption(option);
    }
  },
  methods: {
    //----处理起止事件段的函数-------------------------------------------------------------
    handle_date(){
      var start_format_date=this.start_end_date[0].toString().substring(4,24);
      var tmp=new Date(start_format_date);
      this.start_date=tmp.getTime();
      //-----------------------------------
      var end_format_date=this.start_end_date[1].toString().substring(4,24);
      tmp=new Date(end_format_date);
      this.end_date=tmp.getTime();
    },
    //--清空待全部查询数据的按钮-----------------------------------------------------------
    clear_class_arr(){
      this.class_tags.splice(0);
    },
    clear_student_arr(){
      this.student_tags.splice(0);
    },
    //--------------------------------------------------------------------------------------
    //仅当选择class后,才在学生下拉菜单中加载数据----
    getStudentFromThisClass(selected_class){
      var isMock=true;
      var url=null;
      if(isMock){
        url='./app/studentName.json';
      }else{
        url='http://localhost:5050/getStudListByClass';
      };

      this.$http.get(
        url
      ).then(function(res){
        this.which_student=JSON.parse(res.body).usernameList; 
      });
    },
    //选择以何种方式查询分析数据----by class /  by name
    select_which_type(){
      this.selected_class=this.which_class[0];      //清空
      if(this.selected_type=="班级"){
        this.type_flag=true;
      }else{
        this.type_flag=false;
      } 
    },
    //删除标签(同时删去该标签对应的待查询数据)-----------------------------------------------
    handleClassClose(tag) {
      this.class_tags.splice(this.class_tags.indexOf(tag), 1);
    },
    handleStudentClose(tag) {
      this.student_tags.splice(this.student_tags.indexOf(tag), 1);
    },
    //----------------------------------------------------------------------------------------
    //构建待查询的class数组
    add_class_tag(selected_class){
      var new_tag={
        name:selected_class,
        type:this.color[Math.floor(Math.random()*6)]
      };
      for(var i=0;i<this.class_tags.length;i++){
        if(this.class_tags[i].name==selected_class){
          return;
        }
      }
      this.class_tags.push(new_tag);

      //---------change 事件冲突 ---------------
      //冗余,cas在以班级查询的同时为了保证学生栏实时更新,这里再写一次getStudentFromThisClass函数
      // = = !!!
      var isMock=true;
      var url=null;
      if(isMock){
        url='./app/studentName.json';
      }else{
        url='http://localhost:5050/getStudListByClass';
      };
      this.$http.get(
        url
      ).then(function(res){
        // this.$set(that.classList,res.data);
        this.which_student=JSON.parse(res.body).usernameList;
      });  

      //------------------------------
    },
    //构建待查询的student数组
    add_student_tag(selected_student){
      var new_tag={
        name:selected_student,
        type:this.color[Math.floor(Math.random()*6)]
      }
      for(var i=0;i<this.student_tags.length;i++){
        if(this.student_tags[i].name==selected_student){
          return;
        }
      }
      this.student_tags.push(new_tag);
    },
    //------------发送(短码 暂未做)请求,发送params数据包----------------------
    //  --1 by class
    search_class_info(){
      this.flag4whichAnalysis=false;
      var isMock=true;
      var url=null;
      if(isMock){
        url='./app/class.json';
      }else{
        url='/analysis';
      };
      //--构建params包
        var _this=this;
        this.params.type=1;
        this.keyList=this.class_tags;
      //--
      this.$http.get(
        url,
        _this.params
      ).then(function(res){
        var data=JSON.parse(res.body);
        _this.x_axis.length=0;
        _this.star1.length=0;
        _this.star2.length=0;
        data.data.forEach(function(item){
          _this.x_axis.push(item.key);
          _this.star1.push(((item.countList[0].right/item.countList[0].total)*100).toFixed(1));
          _this.star2.push(((item.countList[1].right/item.countList[1].total)*100).toFixed(1));
        })
      }); 
    },
    //  --2 by name
    search_student_info(){
      this.flag4whichAnalysis=false;
      var isMock=true;
      var url=null;
      if(isMock){
        url='./app/student.json';
      }else{
        url='/analysis';
      };
      //--构建params包
        var _this=this;
        this.params.type=0;
        this.keyList=this.student_tags;
      //--
      this.$http.get(
        url,
        _this.params
      ).then(function(res){
         var data=JSON.parse(res.body);
        _this.x_axis.length=0;
        _this.star1.length=0;
        _this.star2.length=0;
        data.data.forEach(function(item){
          _this.x_axis.push(item.key);
          _this.star1.push(((item.countList[0].right/item.countList[0].total)*100).toFixed(1));
          _this.star2.push(((item.countList[1].right/item.countList[1].total)*100).toFixed(1));
        })
      }); 
    },
    //------------------for self analysis strip list color --------------
    tableRowClassName(row, index) {
      if (index === 1) {
        return 'info-row';
      } else if (index === 3) {
        return 'positive-row';
      }
      return '';
    },
    //-------------------------------------------------------------------
    //------------生成个人成绩扇形图-------------
    generateFigSelf(){
      // draw something-----
      this.flag4whichAnalysis=true;
      var myChart= echarts.init(document.getElementById("fig4self"));
      var option = {
          title: {
              text: '答题正确率统计表'
          },
          toolbox: {
              feature: {
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          tooltip: {},
          radar: {
              // shape: 'circle',
              indicator: [
                 { name: '1星难度 (%)', max: 100},
                 { name: '2星难度 (%)', max: 100},
                 { name: '3星难度 (%)', max: 100},
                 { name: '4星难度 (%)', max: 100},
                 { name: '5星难度 (%)', max: 100},
              ]
          },
          series: [{
              name: '正确率',
              type: 'radar',
              // areaStyle: {normal: {}},
              data: [
                      {
                          value: this.self_analysis_pics_data_arr,
                          label: {
                              normal: {
                                  show: true,
                                  formatter:function(params) {
                                      return params.value;
                                  }
                              }
                          }
                      }
                  ]    
          }]
      }; 

      myChart.setOption(option); 
    }
  },
  mounted(){
    var that=this;                 //存个this
    //  tell use which URL.
    var isMock = true;
    var urls=null;
    var url_self=null;
    var tmp=null;
    //-------------------------------------------------------------------


    if(isMock){
      urls='./app/getClassList.json';
      url_self='./app/self.json';
    }else{
      urls='/getClassList';
      url_self='/analysisSelf';
    }
    //------获取班级信息-------------------------------------------------

    this.$http.get(
      urls
    ).then(function(res){
      // this.$set(that.classList,res.data);
      that.which_class=JSON.parse(res.body).classList;
    });


    //---------加载该页面时 ----右侧为个人统计信息-----------------------
    this.$http.get(
      url_self
    ).then(function(res){
      // this.$set(that.classList,res.data);
      tmp=JSON.parse(res.body);
      this.self_analysis_conclusion.push(tmp.classIndex);
      this.self_analysis_conclusion.push(tmp.classCount);
      this.self_analysis_conclusion.push(tmp.marsIndex);
      this.self_analysis_conclusion.push(tmp.marsCount);
      tmp=tmp.countList;
      // tmp=that.self_analysis_raw.countList;
      tmp.forEach(function(item){
        var one_item={
          diff:item.diff,
          accuracy:(item.right/item.total*100).toFixed(1)+"%"
        };
        var acc=(item.right/item.total*100);
        that.self_analysis.push(one_item);
        that.self_analysis_pics_data_arr.push(acc);  
      })
    });
  }
};
</script>