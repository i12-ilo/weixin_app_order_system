var mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/bookselect', { useUnifiedTopology: true , useNewUrlPaser: true } );

var roleSchema = {
    username:String,
    password:String
}

var books = {
    bookName:String,
    price:Number,
    storage:Number,
    img:String
}


var RoleUser = mongoose.model('roleUser',roleSchema );

var Books = mongoose.model("books",books)
exports.Books = Books
exports.RoleUser = RoleUser


