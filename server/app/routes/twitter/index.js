var Promise = require('bluebird');
var Twitter = require('twitter');
var es = require('event-stream');
var router = require('express').Router();
var q = require('q');
var fs = require('fs');
var gm = require('gm');
// var dir = __dirname + '/img';


var client = new Twitter({
  consumer_key: 'J0WBtqKXQyCyDSql4iAf2Ep88',
  consumer_secret: '3Jl5SwqsEwaqlzFiJ7asJyHvuTibKPC54EIti1ynpmmpNBp9O2',
  access_token_key: '3332834026-w1iZRZIe1fNiJL8dw5xK3hB5AkZvOZAx2K9oiOj',
  access_token_secret: '9QK7u2iBx70ss9mpZymSKUQN8ZOtiezqdaGZ4eCzq88uD'
});

Promise.promisifyAll(client);

module.exports = router;

router.get('/tweets', function(req, res, next) {
  // testing gm
  // console.log('what is gm', gm)
  var text = 'this will be dynamically generated';
  gm(400, 300, "#ececec")
  .gravity('Center')
  .drawText(0, 0, text)
  .write("./server/app/routes/twitter/img/test.png", function (err) {
    if (!err) console.log('done');
  });
  // gm('./server/app/routes/twitter/img/test.png')
  // .drawText(text)
  // .write("./server/app/routes/twitter/img/dynTest.png", function (err) {
  //   if (!err) console.log('done');
  // });

// gm('./server/app/routes/twitter/img/node.png')
// .resize(240, 240)
// .noProfile()
// .write('./server/app/routes/twitter/img/resize.png', function (err) {
//   if (!err) console.log('done');
// });

// gm('./server/app/routes/twitter/img/test.png')
//   .blur(8, 4)
//   .stroke("red", 7)
//   .fill("#ffffffbb")
//   .drawLine(20, 10, 50, 40)
//   .fill("#2c2")
//   .stroke("blue", 1)
//   .drawRectangle(40, 10, 50, 20)
//   .drawRectangle(60, 10, 70, 20, 3)
//   .drawArc(80, 10, 90, 20, 0, 180)
//   .drawEllipse(105, 15, 3, 5)
//   .drawCircle(125, 15, 120, 15)
//   .drawPolyline([140, 10], [143, 13], [145, 13], [147, 15], [145, 17], [143, 19])
//   .drawPolygon([160, 10], [163, 13], [165, 13], [167, 15], [165, 17], [163, 19])
//   .drawBezier([180, 10], [183, 13], [185, 13], [187, 15], [185, 17], [183, 19])
//   .fontSize(68)
//   .stroke("#efe", 2)
//   .fill("#888")
//   .drawText(-20, 98, "graphics magick")
//   .write('./server/app/routes/twitter/img/drawing.png', function(err){
//     if (err) return console.dir(arguments)
//     console.log(this.outname + ' created  :: ' + arguments[3])
//   }
// )


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
  });
};


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


