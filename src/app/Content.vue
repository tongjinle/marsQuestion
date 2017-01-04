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
                    <el-option v-for="item in hard_level" :label="item.label" 
                    :value="item.value">
                    </el-option>
                  </el-select>
                </el-col> 
                <el-col :span="12">
                  <el-select v-model="diff_to" placeholder="筛选难度等级">
                    <el-option v-for="item in hard_level" :label="item.label" 
                    :value="item.value">
                    </el-option>
                  </el-select>
                </el-col> 
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="card-box">
              <strong>统计时间跨度选择:</strong><br><br>
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                      v-model="start_year"
                      align="right"
                      type="date"
                      placeholder="起始年份">
                    </el-date-picker>
                  </div>  
                </el-col> 
                <el-col :span="12">
                  <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                      v-model="end_year"
                      align="right"
                      type="date"
                      placeholder="终止年份">
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
                :disabled="!if_class_button"
                >
                查询班级</el-button>
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
              <el-col :span="10">
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
              <el-col :span="4">
                <el-button type="primary" 
                @click="search_student_info"
                :disabled="!if_student_button"
                >
                查询学生</el-button>  
              </el-col> 
            </el-row>    
          </el-col>
        </el-row>
        <el-card class="box-card">
          <div id="fig"></div>
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
            <strong style="line-height: 25px;">个人成绩统计</span>
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
import echarts from 'echarts';
export default {
  name: 'Content',
  data() {
    return {
      hard_level: [{                     //难度选择框--   目前写死了
        value: '选项1',
        label: ' 1星---最易'
      }, {
        value: '选项2',
        label: ' 2星'
      }, {
        value: '选项3',
        label: ' 3星'
      }, {
        value: '选项4',
        label: ' 4星'
      }, {
        value: '选项5',
        label: ' 5星---最难'
      }],
      select_types:[
        "班级",
        "学生"
      ],
      which_class:null,           //渲染class下拉菜单的class数据
      class_tags:[],              //选择好的待查询class数组
      which_student:null,         //渲染student下拉菜单的student数据
      student_tags:[],            //选择好的待查询student数组
      diff_from:'',               //难度起点
      diff_to:'',                 //难度终点
      selected_class:'',          //class下拉菜单 当前值
      selected_type:'',           //查询方式下拉菜单 当前值
      selected_student:'',        //student下拉菜单 当前值
      start_year:'',              //时间起点
      end_year:'',                //时间终点
      color:["primary","success","warning","danger","gray","blue"],
      profile:{                   
        imgsrc:"http://img.zcool.cn/community/01e50a55bee3b66ac7253f361e874b.jpg",
        name:"XXX",
        className:"1601期",
        evaluate:"C",
        comment:"同志仍需努力!"
      },
      type_flag:false,
      params:{                      //构建基础数据包---待发送
        timeRange:{
          begin:this.start_year,
          end:this.end_year
        },
        diffRange:{
          begin:this.diff_from,
          end:this.diff_to
        },
        type:null,
        keyList:null
      },
      analysisData:null,             //最终返回的分析数据
      self_analysis:[],
      self_analysis_conclusion:[],
      if_class_button:
      this.start_year!='' && this.end_year!='' && this.selected_type!='' && this.selected_class!='' && this.diff_from!='' && this.diff_to!='',
      if_student_button:this.start_year!='' && this.end_year!='' && this.selected_type!='' && this.selected_class!='' && this.diff_from!='' && this.diff_to!='' && this.selected_student!=''
    }
  },
  methods: {
    //仅当选择class后,才在学生下拉菜单中加载数据----
    getStudentFromThisClass(selected_class){
      var isMock=true;
      var url=null;
      if(isMock){
        url='./app/studentName.json';
      }else{
        url='/getStudListByClass';
      };
      this.$http.get(
        url
      ).then(function(res){
        // this.$set(that.classList,res.data);
        this.which_student=res.data;
      });  
    },
    //选择以何种方式查询分析数据----by class /  by name
    select_which_type(){
      this.class_tags.length=0;
      this.student_tags.length=0;
      if(this.selected_type=="班级"){
        this.type_flag=true;
      }else{
        this.type_flag=false;
      } 
    },
    //删除标签
    handleClassClose(tag) {
      this.class_tags.splice(this.class_tags.indexOf(tag), 1);
    },
    handleStudentClose(tag) {
      this.student_tags.splice(this.student_tags.indexOf(tag), 1);
    },
    //构建待查询的class数组
    add_class_tag(selected_class){
       console.log(this.if_class_button);
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
        // this.analysisData=res.data;
        alert("get class!")
      }); 
    },
    //  --2 by name
    search_student_info(){
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
        // this.analysisData=res.data;
        alert("get student!")
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
    }
    //-------------------------------------------------------------------
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
      that.which_class=res.data;
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
      console.log(this.self_analysis_conclusion);
      tmp=tmp.countList;
      // tmp=that.self_analysis_raw.countList;
      tmp.forEach(function(item){
        var one_item={
          diff:item.diff,
          accuracy:(item.right/item.total*100).toFixed(1)+"%"
        };
        that.self_analysis.push(one_item);
      })
    });






    //--------------------------------------------------------------------
    //----echats part ----------------
    var myChart= echarts.init(document.getElementById("fig"));
    myChart.setOption({
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    })
  }
};
</script>