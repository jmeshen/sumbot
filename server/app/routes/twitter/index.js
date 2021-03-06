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
      //this stream triggers when there are new statuses
      client.stream('statuses/filter', {track: "DaDeetzPlz", with: "user"}, function(stream) {
        console.log('We are listening E.T.:')
        stream.on('data', function(tweet) {
            // console.log('this is the username', tweet.user.screen_name)
            // console.log('this is the url', tweet.entities.urls[0].expanded_url)
          // console.log('sending reply with', tweet)
          if(tweet.user.screen_name !== "DaDeetzPlz"){
            console.log('//////about to fire off reply//////////');
            x ? reply(tweet.user.screen_name, tweet.entities.urls[0].expanded_url) :
              setTimeout(function() {reply(tweet.user.screen_name, tweet.entities.urls[0].expanded_url)}, 6000);
          }
          // console.log("inside stream after user sends post", tweet)
          if(tweet.user.screen_name === "DaDeetzPlz") {
            socket.emit('newTweets', tweet);
          }
          // socket.emit('newTweets', tweet);
          // pristine = 0;
        });

        stream.on('error', function(error) {
          console.log(error);
        });
      });
    });
  });


var x = true;
var reply = function(user, link, index, length) {
  var text = '';
    x = false;
    getPage(link).then(function (summary) {
    console.log('////////////receiving summary///////////', summary.summary);
    var str = summary.summary.replace(/\r?\n|\r/g,'');
    str = splitWords(str, 71);
    str = str.join('\n');
    text = str;
    gm('./server/app/routes/twitter/img/tweet-template.png')
    .gravity('NorthWest')
    .fontSize(16)
    .drawText(40, 130, text)
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

function splitWords(str, num){
    // Split by spaces
    return str.split(/\s+/)

    // Then join words so that each string section is less than num
    .reduce(function(prev, curr) {
        if (prev.length && (prev[prev.length - 1] + ' ' + curr).length <= num) {
            prev[prev.length - 1] += ' ' + curr;
        }
        else {
            prev.push(curr);
        }
        return prev;
    }, [])
    // console.log('hello from splitWords', str);

}
// console.log(splitWords('oogidy boogidy console soemthing asdklfj', 4));

// var link = "http://www.theverge.com/2015/6/22/8824271/to-apple-love-taylor-swift-letter-generator";
// getPage(link).then(function (summary) {
//   console.log('getting summary', summary);
//   var str = splitWords(summary.summary, 72);
//   str = str.join('\n');
//   console.log('splitWords called on summary: ', str)
// }, function(err) { console.log(err) })
