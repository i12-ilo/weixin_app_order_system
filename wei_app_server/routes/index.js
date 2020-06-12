var express = require('express');
var router = express.Router();
var {RoleUser,Books}   = require("./../model")

var md5 = require("blueimp-md5")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register",function (req,res) {
  const {username,password} = req.body;
  if(username=="admin"){
    return res.send({code:1,msg:"该用户已存在"})
  }1
  if(!username||!password){
    return res.send({code:1,msg:"用户名和密码必须全部填写"})
  }
  RoleUser.findOne({username},function(err,user){
    if(user){
      return res.send({code:1,msg:"该用户已存在"})
    }else{
      RoleUser.create({
        username:username.trim(),
        password:md5(password)
      },function(err,user){
        // console.log(err,user)
        if(user){
          return res.send({code:0,msg:"注册成功"})
        }
      })
    }
  })


})

router.post("/login",function (req,res) {
  const {username,password} = req.body;
  // console.log(username,password)
  RoleUser.findOne({username:username.trim(),password:md5(password.trim())},function (err,user) {
    // console.log(user)
    if(user){
      res.send({code:0,msg:"该用户存在，可以登录"})
    }else{
      res.send({code:1,msg:"用户名或者密码错误"})
    }
  })
})

// 上架新的图书
router.post("/shevlebooks",function (req,res) {
  console.log(req)
  const {bookName,price,storage,img} = req.body

  if(!bookName||!(+price)||!(+storage)){
    res.send({code:1,msg:"书名，价格，库存三者需全部指定"})
  }else{
    console.log(bookName);
    Books.findOne({bookName:bookName.trim()},function (err,user) {
      if(user){
        res.send({code:1,msg:"该图书已经存在"})
      }else{
        Books.create({
          bookName:bookName.trim(),
         price: +(price.trim()),
          storage:+(storage.trim()),
          img:""
        },function (err,user) {
          if(user){
            res.send({code:0,msg:"添加成功"})
          }else{
            res.send({code:1,msg:"添加失败"})
          }

        })
      }
    })
  }

})

// 下架图书
router.post("/delbook",function (req,res) {
  const {bookName}  = req.body;
  // console.log(bookName)
  Books.remove({bookName:bookName.trim()},function (err,user) {
    if(user){
      res.send({code:0,msg:"图书下架成功"})
    }else{
      res.send({code:1,msg:"图书下架失败"})
    }
  })
})

// 添加图书数量
router.post("/addbookNum",function (req,res) {
  const {bookName,addNum} = req.body;
console.log(bookName,addNum)
  if(!bookName){
    res.send({code:1,msg:"请正确填写书名"})
  }
  if(+(addNum.trim())>0){
    Books.findOne({bookName:bookName.trim()},function (err,user) {
      if(user){
        const {storage} = user;
        Books.update({bookName:bookName.trim()},{$set:{storage:storage+(+(addNum.trim()))}},function (err,user) {
          if(user){
            res.send({code:0,msg:"修改成功"})
          }else{
            res.send({code:1,msg:"修改失败"})
          }

        })
      }else{
        res.send({code:1,msg:"该图书不存在"})
      }
    })
  }else{
    res.send({code:1,msg:"添加的数量是不合理的"})
  }

})


// 减少图书的数量
router.post("/decreasebookNum",function (req,res) {
  const {bookName,decNum} = req.body;

  if(!bookName){
    res.send({code:1,msg:"请正确填写书名"})
  }
  if(+(decNum.trim())<0){
    Books.findOne({bookName:bookName.trim()},function (err,user) {
      if(user){
        const {storage} = user;
        Books.update({bookName:bookName.trim()},{$set:{storage:storage+(+(decNum.trim()))}},function (err,user) {
          if(user){
            res.send({code:0,msg:"修改成功"})
          }else{
            res.send({code:1,msg:"修改失败"})
          }

        })
      }else{
        res.send({code:1,msg:"该图书不存在"})
      }
    })
  }else{
    res.send({code:1,msg:"删除的数量是不合理的"})
  }

})


// 修改图书的价格
router.post("/updatePrice",function (req,res) {
  const {bookName,price} = req.body;

  if(!bookName){
    res.send({code:1,msg:"请正确填写书名"})
  }
  if(+(price.trim())>=0){

        Books.update({bookName:bookName.trim()},{$set:{price:+(price.trim())}},function (err,user) {
          if(user){
            res.send({code:0,msg:"修改成功"})
          }else{
            res.send({code:1,msg:"修改失败"})
          }

        })

  }else{
    res.send({code:1,msg:"修改的价格是不合理的"})
  }

})



router.get("/findAll",function (req,res) {
  res.set("Access-Control-Allow-Origin","*");
  Books.find({},function(err,user){
    if(user){
      res.send({code:0,data:user,msg:"查询成功"})
    }else{
      res.send({code:0,data:[],msg:"查询失败"})
    }
  })

})

module.exports = router;
