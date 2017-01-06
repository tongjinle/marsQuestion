<template>
<!-- 修改密码模块 -->
  <div class="changePassword">	  
  	<div class="changeTil"><h3>修改密码 <span>>></span> </h3></div>

  	<div class="password" v-if="!login">
	  	<form action="" method="get">
	  		原 密 码: 　<input type="password" name="" v-model="oldPassword" v-on:blur="ready"><br>
		  	新 密 码: 　<input type="password" name="" v-model="newPassword" v-on:blur="judgeUsername"><br>
		  	确认密码:　<input type="password" name="" v-model="conPassword" v-on:blur="judgeUsername"><br>
		  	<a href="javascript:;" v-on:click="saveInfo">保存信息</a>
	  	</form>
	  	<p class="wrong" v-if="wrong">密码不正确,请重新输入!</p>
	  	<p class="passwordFlag" v-if="passwordFlag">请输入8-16位字符串(包含大小写英文字母,下划线,数字),首字母必须为英文字母</p>
	  	<p class="conPasswordFlag" v-if="conPasswordFlag">与新密码不符,请重新输入!</p>
  	</div>
  	
  	<div class="success" v-if="login">
	  	<p>恭喜您,修改密码成功!</p>
	  	<p @click="ReLogin"><router-link to="/login">点击重新登录</router-link></p>
 	</div>

  </div>

  
</template>

<script>

export default {
  name: 'change',

   data(){
    return{    
      newPassword: "", 
      conPassword:"",   
      oldPassword:"",  
      passwordFlag:false, 
      conPasswordFlag:false,
      wrong:false,
      login:false,
      
    }
   },
  methods:{
    judgeUsername:function(){      
       var reg2=/^[a-zA-Z][a-zA-Z0-9_]{7,15}$/;  //判断密码
       this.passwordFlag=this.newPassword==""?false:(reg2.test(this.newPassword)==true?false:true);

       this.conPasswordFlag=this.conPassword==""?false:(this.conPassword==this.newPassword ? false:true)   //判断新密码跟确认密码是否一致  
      
     },
	  ready: function() {  //判断原来的密码是否输入正确

	   var urlDict={};
	    var isMock=true;
	    if(isMock){         //判断是不是模拟数据
	      urlDict.login="./app/changePassword/editPwd.json";
	    }else{
	      urlDict.login="http://localhost:3000/login";
	    }; 

	    this.$http.get(urlDict.login,{}).then((response)=> {
	      // console.log(response.data.username);
	      if(response.data.password){     //如果返回true,密码正确
	        console.log("密码正确");
	      }else{
	      	this.wrong=true;
	      }
	    })

	   },
    saveInfo: function() {  //保存信息
    	if(this.newPassword!=""&&this.conPassword!=""&&this.oldPassword!=""&&this.passwordFlag==false&&this.conPasswordFlag==false&&this.wrong==false){   //如果输入的内容都对,将新密码传给服务器
    		this.$http.get("./app/changePassword/newPassword.json",{});
    		this.login=true;
    	}  
   },
   ReLogin: function(){   //点击重新登录的时候,跳转到登录页面,并且取消原来的cookie

   }
  }







}


</script>
