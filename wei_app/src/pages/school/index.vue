<template>
  <div>
    <div class="temWrap">
      <ul>
        <li  v-for="(item,index) in books" :key="index" @click="buyBook(item.bookName,item.price)">
          <img :src="'/static/images/'+item.img+'.jpg'" alt />
          <p>{{item.bookName}} ￥{{item.price}}</p>
        </li>
      </ul>
    </div>

    <div class="mongolia" v-show="isShowAdd" @click="changeShow">
      <ul class="showAdd" @click.stop>
        <li>
          <h3>确认订单</h3>
        </li>
        <li>
          <p>书名：{{bookName}}</p>
        </li>
        <li>
          <p>单价：{{price}}</p>
        </li>
        <li>
          <p>
            数量：
            <input type="number" v-model="num" />
          </p>
        </li>
        <li class="btnList">
          <button @click="confirm">提交</button>
        </li>
      </ul>
    </div>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      bookName: "",
      price: 0,
      num: 1,
      isShowAdd: false
    };
  },
  created() {
    this.findAll();
  },
  methods: {
      confirm:function(){
          this.changeShow()
      },
      buyBook:function(bookName,price){
          this.bookName = bookName;
          this.price = price;
          this.changeShow()
      },
    changeShow: function() {
      this.isShowAdd = !this.isShowAdd;
    },
    findAll: function() {
      wx.request({
        url: "http://localhost:4000/findAll",
        success: res => {
          console.log(res.data.data);
          this.books = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.temWrap ul {
  width: 100%;
  display: inline-block;
}
.temWrap ul li {
  display: inline-block;
  width: 45%;
  height: 400rpx;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #cc9756;
  margin: 10rpx;
}
.temWrap ul li img {
  width: 90%;
  height: 85%;
}
.mongolia {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.mongolia .showAdd {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  height: 600rpx;
  width: 600rpx;
}
.showAdd {
  display: flex;
  flex-direction: column;
}

.showAdd li {
  flex: 1;
}
.showAdd li h3 {
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  font-weight: bold;
}
.showAdd li input {
  width: 70%;
  margin: 0 auto;
  border: 1px solid #cc9756;
  border-radius: 3px;
  height: 50rpx;
}
.mongolia .showAdd .btnList {
  display: flex;
}
.mongolia .showAdd .btnList button {
  box-sizing: border-box;
  flex: 1;
  height: 60rpx;
  font-size: 25rpx;
  margin: 10rpx;
  background-color: #cc9756;
}
</style>