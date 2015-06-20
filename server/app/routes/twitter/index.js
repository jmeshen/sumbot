var Twitter = require('twitter');
var es = require('event-stream');
var router = require('express').Router();
var q = require('q');


var client = new Twitter({
  consumer_key: 'J0WBtqKXQyCyDSql4iAf2Ep88',
  consumer_secret: '3Jl5SwqsEwaqlzFiJ7asJyHvuTibKPC54EIti1ynpmmpNBp9O2',
  access_token_key: '3332834026-w1iZRZIe1fNiJL8dw5xK3hB5AkZvOZAx2K9oiOj',
  access_token_secret: '9QK7u2iBx70ss9mpZymSKUQN8ZOtiezqdaGZ4eCzq88uD'
});



module.exports = router;

router.get('/tweets', function(req, res, next) {
  // console.log('hitting tweet route');
  // res.send("hellllloooo????")
  var params = {screen_name: 'DaDeetzPlz'};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        res.send(tweets);
      }   
  })
});


process.nextTick(function() {
  var io = require('../../../io')();
  io.on('connection', function (socket) {
      console.log('inside io')
      client.stream('user', function(stream) {
        console.log('We are listening E.T.:')
        stream.on('data', function(tweet) {
          // reply(tweet.user.screen_name, tweet.entities.urls[0].expanded_url);
          
          socket.emit('newTweets', tweet);
          //res.send(tweet)
        });

        stream.on('error', function(error) {
          console.log(error);
        });
      });
        
  });
})

// client.stream('statuses/filter', {track: "DaDeetzPlz"}, function(stream) {
//   console.log('We are listening E.T.:')
//   stream.on('data', function(tweet) {
//     reply(tweet.user.screen_name, tweet.entities.urls[0].expanded_url);
    

//     res.send(tweet)
//   });

//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });

// client.post('statuses/update', { status: '@jmeshen hello world!' }, function(err, data, response) {
//   console.log(data)
// })


var reply = function(user, link, index, length) {
  client.post('statuses/update', { status: '@' + user + " this yo link: " + link}, function(err, data, response) {
    // console.log("where is this going? ", data)
    // response.send(data);
  })
}


// var getPage = require('summarizer').getPage;

// var uri = 'http://www.bbc.com/news/technology-33183508';

// getPage(uri).then(function (data) {
//   console.log("this works brooooo", data.summary)
//   /* check out the node-module summarizer and check out the docs and the example.js
//      thats where i got lines 62 to 72 from
//      not sure about the quality of the info but yeah...
//      i think we are going to have to tack on some hard
//      challenges to our project as we go along, just so we
//      stay ambitious
//      console.log(JSON.stringify(data, null, 2)); */
//    }, console.error);


