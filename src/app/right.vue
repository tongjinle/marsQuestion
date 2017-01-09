<template>
  <div>
   <router-view v-on:logChildTellMe="ListenToLog" v-on:isReLogin="isReLogin" 
   v-bind:isrelogin="isLogin"></router-view> 
  </div>
</template>

<script>

export default {
  name: 'right',

   data(){
    return{  
        isLogin:false,
    }
   },

  methods:{
    ListenToLog: function(msg){
       //接收到子集(log.vue)传来的用户名
      // console.log(msg);
      // this.logChildWords=msg; 

	//把收到的用户名 再传给父级 main.vue
      this.$emit("rightChildTellMe",msg);  
      
    },
    isReLogin:function(msg){   //判断是否重新登录
    	if(msg){
    		//收到msg,说明要重新登录,再发给父级(main.vue)
    		this.$emit("isReLogin",msg); 
//告诉log.vue 取消cookies ,将消息传给子集(log.vue)
    		this.isLogin=true;
    	}
    }
  }
};



</script>
