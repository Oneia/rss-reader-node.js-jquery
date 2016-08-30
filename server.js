var rssFinder = require('rss-finder');
var parser = require("feed-read");
var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var data = '';

var site = '';
var channelMy = '';

//подключаем папку и главную к сервере
app.use('/', express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + 'index.html');
});

//Обработка пост запроса
app.post('/Ajax', function (req, res){
    //console.log(req.body.site);
    site = req.body.site;
    var b = res;
    //поиск RSS по строке сайта
    rssFinder(site).then(function(res) {
   // console.log(res.feedUrls.length);
        if( res.feedUrls.length == 0){
            b.json({});
        }
        channelMy = res.feedUrls[0].url;
        //Выборка новостей с полученного канала
        parser(channelMy, function(err, parsed) {
            b.json(parsed);
        })
    }).catch(function(err) {
        console.log(err);
    });
});
app.listen(8080);
console.log('Express server listening on port 8080');