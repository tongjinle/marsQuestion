<template>
<!-- 注册模块 -->
  <div class="loginBg"> 
    <div class="log">
    	<h2><span></span>用户登录</h2>
      <div class="biaodan">
      	<form action="" method="get">
      		<input type="text" name="" 
          placeholder="请输入用户名 例:1608-柯南" 
          v-model="username" 
          v-on:blur="judgeUsername">
          <br>

      		<input type="password" name="" 
          placeholder="请输入密码" 
          v-model="password"
          v-on:blur="judgeUsername">
          <br>
      		<label>
      			<input type="checkbox" v-model="remember">记住我
      		</label>
      		<span class="forget">忘记密码>></span><br>

      		<!-- <a href="javascript:;" id="denglu">登录</a> -->
     
          <el-button type="text" :disabled="login" @click="ready">登录
          </el-button> 	<!--true的时候禁用,false的时候可以点击登录,用户名和密码都正确-->
      	</form>
      	<p v-if="usernameFlag" class="name">用户名格式为[期数]-[姓名]-[同名加0001/0002]</p>
      	<p v-if="passwordFlag" class="mima">密码由8-16位字符组成(包含英文,下划线和数字),首字母必须为英文字母</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'log',

  data(){
    return{    
      username: "",
      password: "",
      usernameFlag:false,
      passwordFlag:false, 
      login:true,
      remember:false,
    }
   },
   props:["isrelogin"], //接收父级(right.vue)传来的是否重新登录消息

  mounted(){
    if(this.isrelogin){
      console.log(this.isrelogin);

      localStorage.clear('userName');
      localStorage.clear('passWord');
       this.username='';
       this.password='';
    };
      this.username= localStorage.getItem('username');
      this.password= localStorage.getItem('password');
      this.remember=true;
      this.login=false;

  },
  methods:{
    judgeUsername:function(){      

       var reg1=/^\d{4}-[\u4e00-\u9fa5]*/; //判断用户名
      this.usernameFlag=this.username==""?false:(reg1.test(this.username)==true?false:true);

       var reg2=/^[a-zA-Z][a-zA-Z0-9_]{7,15}$/;  //判断密码
       this.passwordFlag=this.password==""?false:(reg2.test(this.password)==true?false:true);

       if(this.usernameFlag==false&&this.passwordFlag==false&&this.username!=""&&this.password!=""){
        this.login=false;
        }
     },

     //************************************************************************************
    ready: function() {  

       var urlDict={};
        var isMock=true;
        if(isMock){         //判断是不是模拟数据
          urlDict.login="./app/login/login.json";
        }else{
          urlDict.login="http://10.21.117.213:5050/login";
        };

        // this.$http({
        //           url:"./app/login/login.json",
        //           method: 'POST',
        //           emulateJSON: true,
        //           data: {
        //               username:this.username,                  
        //               password:this.password                   
        //           }
        //       }).then(function(response) {
        //         console.log(response.data.username)
        //         /*if(response){   //如果返回true,登录成功

        //         }*/
                  

        //       })
        //      /* .error(function(response) {
        //         alert("数据获取失败,请重新登录!")
        //       }) */

        var data={
          username:this.username,                  
          password:this.password      
        };
      

        this.$http.get(urlDict.login,data).then((response)=> {
        // console.log(response.data.flag);

          if(response.data.username){     //如果返回true,登录成功

           
             

        // 判断是否勾选了保存密码
        // console.log(this.remember)
        if(this.remember){
          localStorage.setItem('username',this.username);          
          localStorage.setItem('password',this.password);          
          // setCookie('userName', this.username, 14);
          // setCookie('passWord', this.password, 14);
        }else{
          localStorage.clear('userName');
          localStorage.clear('passWord');
           // removeCookie("userName");
           // removeCookie("passWord");
           this.username='';
           this.password='';
        }


//------------------------------------------------------------
        //跳转到首页 把用户名传出去
        this.$router.push({path:'/'});
        this.$emit("logChildTellMe",this.username);  //把用户名传给父级,暂时先跳到修改密码页面
//--------------------------------------------------------------
         //设置cookie
        function setCookie(name, value, iDay){
            var oDate = new Date();
            oDate.setDate( oDate.getDate() + iDay );
            document.cookie = name+'='+value+';expires=' + oDate;
        };


        //封装移除cookie的函数
        function removeCookie(key){
            setCookie(key,'',-1);
        };

        //读取cookie
        function getCookie(name){
            var array1 = document.cookie.split("; ");
            for(var i = 0; i < array1.length; i++ ){
                var array2 = array1[i].split('=');
                if(array2[0] == name){
                    return array2[1];
                }
            };
            return '';
        };






          }
        })

        

        

       },


    },

  

 //***********************************************************************    

    











  }
</script>
