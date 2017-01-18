<template>
  <div>
   <router-view v-on:logChildTellMe="ListenToLog" v-on:isReLogin="isReLogin" 
   v-bind:isrelogin="isLogin" v-on:sendToken="sendTokenMsg" v-bind:sendTokenMsg="tokenMsg" v-on:myLogin="myLogin"></router-view> 
  </div>
</template>

<script>

export default {
  name: 'right',

   data(){
    return{  
        isLogin:false,
        tokenMsg:""
    }
   },
  // props:["isLogOut"],   //是否登录 传给子集(log.vue)
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
    },
    sendTokenMsg:function(msg){   //接收token
        //再传给子级(change.vue)
        this.tokenMsg=msg;
    },
    myLogin:function(msg){   //点击登录传来的
        console.log(msg);
          //说明点击了登录,告诉main
        this.$emit("myLogin",msg); 
        
    }
  }
};



</script>
