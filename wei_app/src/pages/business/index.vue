<template>
  <div>
    <!-- // 图书列表 -->
    <div class="booklist">
      <ul>
        <li>书名</li>
        <li>价格</li>
        <li>库存</li>
        <li class="btn addbtn">增加</li>
        <li class="btn decreasebtn">减少</li>
        <li class="btn delbtn">下架</li>
      </ul>
      <ul v-for="(item,index) in books" :key="index">
        <li>{{item.bookName}}</li>
        <li>{{item.price}}</li>
        <li>{{item.storage}}</li>
        <li class="btn addbtn" @click="addNum(item.bookName)">增加</li>
        <li class="btn decreasebtn" @click="decreaseNum(item.bookName)">减少</li>
        <li class="btn delbtn" @click="delBook(item.bookName)">下架</li>
      </ul>
    </div>
    <!-- // 按钮 上一页，下一页，上架新书 -->
    <div>
      <ul class="change">
        <li>上一页</li>
        <li>下一页</li>
        <li @click="changeShow">上架图书</li>
      </ul>
    </div>
    <!-- // 蒙层添加图书 -->
    <div class="mongolia" v-show="isShowAdd" @click="changeShow">
      <ul class="showAdd" @click.stop>
        <li>
          <h3>添加图书</h3>
        </li>
        <li>
          <input type="text" placeholder="bookName" v-model="bookName" />
        </li>
        <li>
          <input type="number" placeholder="price" v-model="price" />
        </li>
        <li>
          <input type="number" placeholder="storage" v-model="storage" />
        </li>
        <li class="btnList">
          <button>重置</button>
          <button @click="shevlesBook">提交</button>
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
      storage: 0,
      isShowAdd: false
    };
  },
  created() {
    this.findAll();
  },
  methods: {
    addNum: function(bookName, num = 1) {
      wx.request({
        url: "http://localhost:4000/addbookNum",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        data: {
          bookName: bookName,
          addNum: num
        },
        success: res => {
          if (res.data.code == 0) {
            this.findAll();
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    decreaseNum: function(bookName, num = -1) {
      wx.request({
        url: "http://localhost:4000/decreasebookNum",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        data: {
          bookName: bookName,
          decNum: num
        },
        success: res => {
          if (res.data.code == 0) {
            this.findAll();
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    delBook: function(bookName) {
      wx.request({
        url: "http://localhost:4000/delbook",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        data: {
          bookName: bookName
        },
        success: res => {
          if (res.data.code == 0) {
            this.findAll();
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    findAll: function() {
      wx.request({
        url: "http://localhost:4000/findAll",
        success: res => {
        //   console.log(res.data.data);
          this.books = res.data.data;
        }
      });
    },
    changeShow: function() {
      this.isShowAdd = !this.isShowAdd;
    },
    reset: function() {
      this.bookName = "";
      this.price = 0;
      this.storage = 0;
    },
    shevlesBook: function() {
      console.log("this",this);
      wx.request({
        url: "http://localhost:4000/shevlebooks",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        data: {
          bookName: this.bookName,
          price: this.price,
          storage: this.storage
        },
        success: res => {
          if (res.data.code == 0) {
            this.changeShow();
            this.findAll();
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style scoped>
.booklist ul {
  text-align: center;
  display: flex;
  font-size: 30rpx;
  border: 1px solid #ccc;
  border-right: none;
}
.booklist ul li {
  min-height: 50rpx;
  line-height: 50rpx;
  flex: 1;
  border-right: 1px solid #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.booklist ul .btn {
  color: #fff;
}
.booklist ul .addbtn {
  background-color: green;
}
.booklist ul .decreasebtn {
  background-color: #008c8c;
}

.booklist ul .delbtn {
  background-color: red;
}
.change {
  margin: 10px 0px;
  padding: 10px;
  display: flex;
}
.change li {
  flex: 1;
  margin: 5px;
  background: #ecf5ff;
  text-align: center;
  height: 50rpx;
  border-radius: 5px;
  line-height: 50rpx;
  color: #cc9756;
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
  width: 90%;
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