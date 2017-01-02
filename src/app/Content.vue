<template>
  <div id="right_part">
    <el-row :gutter="20">
      <el-col :span="15" class="midd_outer">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="value1" placeholder="筛选难度等级">
              <el-option v-for="item in hard_level" :label="item.label" 
              :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="value2" placeholder="筛选班级">
              <el-option v-for="item in which_class" :label="item.label" 
              :value="item.value">
              </el-option>
            </el-select>    
          </el-col>
          <el-col :span="5">
            <div class="block start_box">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="start_year"
              align="right"
              type="year"
              placeholder="起始年份">
            </el-date-picker>
            </div>
          </el-col>
          <el-col class="line endash" :span="1">--</el-col>
          <el-col :span="5">
            <div class="block end_box">
              <span class="demonstration"></span>
              <el-date-picker
              v-model="end_year"
              align="right"
              type="year"
              placeholder="终止年份">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <div id="fig"></div>
      </el-col>
      <el-col :span="8" class="right_outer"> 
        <div id="info">
          <el-row>
            <el-col :span="24" class="info_item head_pic"><img src="http://img.zcool.cn/community/01e50a55bee3b66ac7253f361e874b.jpg"></el-col>
          </el-row>  
          <el-row>
            <el-col :span="24" class="info_item"><span>用户名　：</span>  {{profile.name}}</el-col>
          </el-row>  
          <el-row>
            <el-col :span="24" class="info_item"><span>班级　　：</span>  {{profile.className}}</el-col>
          </el-row>  
          <el-row>
            <el-col :span="24" class="info_item"><span>平均得分：</span>  {{profile.evaluate}}</el-col>
          </el-row>  
          <el-row>
            <el-col :span="24" class="info_item"><span>综合评价：</span>  {{profile.comment}}</el-col>
          </el-row> 
        </div>   
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
      hard_level: [{
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
      which_class:[{
        value: '选项1',
        label: '1601期'
      }, {
        value: '选项2',
        label: '1602期'
      }, {
        value: '选项3',
        label: '1603期'
      }, {
        value: '选项4',
        label: '1604期'
      }, {
        value: '选项5',
        label: '1605期'
      }],
      value1:'',
      value2:'',
      start_year:'',
      end_year:'',
      profile:{
        imgsrc:"http://img.zcool.cn/community/01e50a55bee3b66ac7253f361e874b.jpg",
        name:"XXX",
        className:"1601期",
        evaluate:"C",
        comment:"革命尚未成功，同志仍需努力!"
      }
    }
  },
  mounted(){
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