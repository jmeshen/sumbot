var Twitter = require('twitter');
var es = require('event-stream');
var router = require('express').Router();
var q = require('q');


module.exports = router;

var client = new Twitter({
  consumer_key: 'J0WBtqKXQyCyDSql4iAf2Ep88',
  consumer_secret: '3Jl5SwqsEwaqlzFiJ7asJyHvuTibKPC54EIti1ynpmmpNBp9O2',
  access_token_key: '3332834026-w1iZRZIe1fNiJL8dw5xK3hB5AkZvOZAx2K9oiOj',
  access_token_secret: '9QK7u2iBx70ss9mpZymSKUQN8ZOtiezqdaGZ4eCzq88uD'
});

var params = {screen_name: 'DaDeetzPlz'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log("this works!", tweets[0].text);
        console.log("this works!", tweets[1].text);
    console.log("this works!", tweets[2].text);

  }
});

client.stream('statuses/filter', {track: "DaDeetzPlz"}, function(stream) {
  console.log('We are listening E.T.:')
  stream.on('data', function(tweet) {
    // functionality for multi links
    // var x = 1;
    //   if(tweet.entities.urls.length > 1){
    //     for(var i = 0; i < tweet.entities.urls.length; i++){
    //       reply(tweet.user.screen_name, tweet.entities.urls[i].expanded_url, x++, tweet.entities.urls.length );
    //     }
    //   } else {
    // }
        reply(tweet.user.screen_name, tweet.entities.urls[0].expanded_url);
      
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

// client.post('statuses/update', { status: '@jmeshen hello world!' }, function(err, data, response) {
//   console.log(data)
// })


var reply = function(user, link, index, length) {
  client.post('statuses/update', { status: '@' + user + "this yo link: " + link}, function(err, data, response) {
        console.log(data)
      })
  // post for multi links
  // client.post('statuses/update', { status: '@' + user +" " + index +"of" +length + "this yo link:" + link}, function(err, data, response) {
  //       console.log(data)
  //     })
}

