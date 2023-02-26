const expess = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = expess();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expess.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItem = [];

app.get('/', function(req, res){

    const day = date.getDate();

    res.render('list', {titleHead: "Home", listTitle: day, newListItem: items});
});

app.post('/', function(req, res){
    const title = req.body.list;
    const item = req.body.newItem;
    if(title === "Work"){
        workItem.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function(req, res){
    res.render('list', {titleHead: "Work", listTitle: "Work", newListItem: workItem})
});

app.get('/about', function(req, res){
    res.render('about',{titleHead: "About"});
});

app.listen(3000, function(){
    console.log("Server started on port: 3000");
});