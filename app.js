let express = require("express")
let app = express()
app.use(express.static("public")) //增加靜態檔案的路徑


//EJS模板
let engine = require("ejs-locals")
app.engine("ejs", engine)
app.set("views", "./views") //讀取views檔的ejs
app.set("view engine", "ejs") //利用ejs讀取

//取得表單資料
let bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//類似守門員的邏輯
app.use(function (req, res, next) {
    console.log("有人進來了");
    next()  //往下進行
})


app.get("/user/:name/", function (req, res) {
    let myName = req.params.name     //  /user/tom
    let p = req.query.p             //  /user/tom?p=hello
    let limit = req.query.limit     //  /user/tom?p=hello&limit=30
    res.send(`${myName}想要找${p}的前${limit}筆資料`)
})

app.get("/photo", function (req, res) {
    // res.send("<html><head></head><body><img src='123.jpg'></body></html>")  //載入靜態資料(圖片)
    res.render("photo", {
        "title": "<h1>my name is Wei</h1>",   //將參數導入至photo.ejs
        "gender": "man",
        "show": true,
        "skill": [
            "html",
            "css",
            "js"
        ]
    })   //利用ejs讀取html
})

app.get("/search", function (req, res) {
    res.render("search")
})

app.get("/searchAJAX", function (req, res) {
    res.render("searchAJAX")
})

app.post("/searchList", function (req, res) {
    // console.log(req.body);    //回傳資料
    res.redirect("search")    //轉址  再回到search，如果沒轉址網頁會一直轉圈
})

app.post("/searchAJAX", function (req, res) {    //和轉址不同，AJAX不會跳其他頁面，會在同一頁跑資料
    // console.log(req.body)
})

app.use(function (req, res) {
    res.status(404).send("抱歉，找不到頁面")
})

app.use(function (req, res, err) {
    console.error(err.stack);
    res.status(500).send("抱歉，程式出錯")
})




//監聽port
let port = process.env.PORT || 3000
app.listen(port)   //127.0.0.1:3000