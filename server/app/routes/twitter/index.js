var Promise = require('bluebird');
var Twitter = require('twitter');

var es = require('event-stream');
var router = require('express').Router();
// var q = require('q');


module.exports = router;

var client = new Twitter({
  consumer_key: 'J0WBtqKXQyCyDSql4iAf2Ep88',
  consumer_secret: '3Jl5SwqsEwaqlzFiJ7asJyHvuTibKPC54EIti1ynpmmpNBp9O2',
  access_token_key: '3332834026-w1iZRZIe1fNiJL8dw5xK3hB5AkZvOZAx2K9oiOj',
  access_token_secret: '9QK7u2iBx70ss9mpZymSKUQN8ZOtiezqdaGZ4eCzq88uD'
});
Promise.promisifyAll(client);

function getUserTimelineAsync(path, params) {
  return new Promise(function(resolve, reject) {
    client.get(path, params, function(error,tweets) {
      // console.log('got tweets from twitter', tweets);
      // console.log('this is response from client.get', response);
      if (error) return reject(error);
      resolve(tweets);
    })
  })
}

router.get('/tweets', function(req, res, next) {


  var params = {screen_name: 'DaDeetzPlz'};
  // getUserTimelineAsync('statuses/user_timeline', params).then(function(data) {
  //   console.log('got data from promise!!', data.length);
  //   res.json(data);
  // }, function(err) {
  //   console.log('error from getUserTimelineAsync', err);
  // })

//   client.getAsync('statuses/user_timeline', params).then(function(tweets) {
//     console.log('did i get tweets from then? ', tweets);
//     var embedTweets = [];
//     // tweets.forEach(function(tweet) {
//     for (var i = 0; i < tweets.length; i++) {
//       // console.log('tweeeeeeets', tweets.length)
//       // console.log('tweeeeeeets', tweets[0])
//       // console.log('tweets id', tweets[i].id_str);
//       client.getAsync('statuses/oembed', { id: tweets[i].id_str}).then(function(data) {
//         embedTweets.push(data);
//       }, console.log)
//     }
//     // })
//     console.log('embed tweets objects??', embedTweets);
//     res.json(embedTweets);
//   }, console.log)
// })
  client.getAsync('statuses/user_timeline', params).then(function(tweets){
    console.log(tweets[0].length);
      var embedTweets = [];

      for (var i = 0; i < tweets[0].length; i++) {
        // console.log('tweeeeeeets', tweets.length)
        // console.log('tweeeeeeets', tweets[0])
        // console.log('tweets id', tweets[i].id_str);
        client.getAsync('statuses/oembed', { id: tweets[0][i].id_str}).then(function(embedData) {
          // console.log('resolve oembed?', data[0])
          embedTweets.push(embedData[0]);
          console.log('embedTweets array: ', embedTweets);
        }, console.log)
      }


    })
  // .then(function(data) {
  //     console.log(data);
  //   console.log('EMBED TWEET ARRAY??', embedTweets);
  //   })

    // res.json(embedTweets);
    // }
  })
// })

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

// Phantom.JS
// need to use phantom to querySelect the canvas that generates the SVG





var getPage = require('summarizer').getPage;

var uri = 'http://www.bbc.com/news/technology-33183508';

getPage(uri).then(function (data) {
  // console.log("this works brooooo", data.summary)
  /* check out the node-module summarizer and check out the docs and the example.js
     thats where i got lines 62 to 72 from
     not sure about the quality of the info but yeah...
     i think we are going to have to tack on some hard
     challenges to our project as we go along, just so we
     stay ambitious
     console.log(JSON.stringify(data, null, 2)); */
   }, console.error);



