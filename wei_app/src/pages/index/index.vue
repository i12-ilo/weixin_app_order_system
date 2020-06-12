<template>
  <div class="indexContainer">
    <div class="logo">
      <img src="/static/images/book.jpg" alt />
      <div class="username">
        <input type="text" v-model="username" placeholder="username" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <div class="submitWrap">
        <button @click="login">提交</button>
      </div>
      <div class="isShow" v-show="isShow">
        您填写的用户名密码有误
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "business",
      password: "123",
      isShow:false
    };
  },

  components: {},

  methods: {
    login: function() {
      let { username, password } = this;
      wx.request({
        url: "http://localhost:4000/login",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        data: {
          username,
          password
        },
        success: res => {
          if (res.data.code == 0) {
           
            if (username == "business") {
              wx.navigateTo({
                url: "../business/main"
              });
            }else{
               wx.navigateTo({
                url: "../school/main"
              });
            }
          }else{
            console.log("您输入的用户名或者密码有误");
            this.isShow = true;
          }
        },
        fail:res=>{
          console.log("您输入的用户名或者密码有误");
            this.isShow = true;
        }
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.indexContainer {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.logo img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx;
  margin: 100rpx;
}
.username,
.password,
.submitWrap {
  width: 90%;
  margin: 0 auto;
  border: 1px solid #ccc;
  margin: 50rpx;
  border-radius: 10rpx;
}
.username input,
.password input {
  height: 80rpx;
}

.submitWrap button {
  font-size: 30rpx;
  background-color: #000;
  /* opacity: 0.5; */
  color: #cc9756;
  outline: #cc9756;
}
.isShow{
  width:200px;
  height:100px;
  color:red;
}
</style>
