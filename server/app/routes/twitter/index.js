var Promise = require('bluebird');
var Twitter = require('twitter');
var es = require('event-stream');
var router = require('express').Router();
var q = require('q');
var fs = Promise.promisifyAll(require('fs'));
var gm = require('gm');
var getPage = require('summarizer').getPage;


var client = new Twitter({
  consumer_key: 'J0WBtqKXQyCyDSql4iAf2Ep88',
  consumer_secret: '3Jl5SwqsEwaqlzFiJ7asJyHvuTibKPC54EIti1ynpmmpNBp9O2',
  access_token_key: '3332834026-w1iZRZIe1fNiJL8dw5xK3hB5AkZvOZAx2K9oiOj',
  access_token_secret: '9QK7u2iBx70ss9mpZymSKUQN8ZOtiezqdaGZ4eCzq88uD'
});

Promise.promisifyAll(client);

module.exports = router;

router.get('/tweets', function(req, res, next) {

var params = {screen_name: 'DaDeetzPlz'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    res.send(tweets);
    }
  });
});


process.nextTick(function() {
  var io = require('../../../io')();
  io.on('connection', function (socket) {
    console.log('inside io')
    client.stream('statuses/filter', {track: "DaDeetzPlz", with: "user"}, function(stream) {
      console.log('We are listening E.T.:')
      stream.on('data', function(tweet) {
        if(tweet.user.screen_name !== "DaDeetzPlz"){
          x ? reply(tweet.user.screen_name, tweet.entities.urls[0].expanded_url) :
            setTimeout(function() {reply(tweet.user.screen_name, tweet.entities.urls[0].expanded_url)}, 6000);
        }
        socket.emit('newTweets', tweet);
      });

      stream.on('error', function(error) {
        console.log(error);
      });
    });
  });
})

var x = true;
var reply = function(user, link, index, length) {
  var text = '';
    x = false;
    getPage(link).then(function (summary) {
      var str = summary.summary.replace(/\r?\n|\r/g,'');
      str = str.match(/(.|[\n]){1,57}/g).join('\n');
      text = str;
        gm('./server/app/routes/twitter/img/template.png')
          .gravity('NorthWest')
          .fontSize(16)
          .drawText(40, 100, text)
          .write("./server/app/routes/twitter/img/summary.png", function (err) {
            if (!err) {
            console.log('/////////////done creating summary image////////');
            }
            else console.log(err);
          });

    setTimeout(function(){
    fs.readFileAsync('./server/app/routes/twitter/img/summary.png').then(function(data) {

    client.post('media/upload', {media: data}, function(error, media, response){
      if (!error) {
        
        var status = {
          status: '@' + user + " Here's your summary for: " + link,
          media_ids: media.media_id_string // Pass the media id string
        }

        client.post('statuses/update', status, function(err, data, response) {
          if(!err){
            x = true;
          }
        });
      }
    });
  })
    }, 5000)
  }, console.log);
};
