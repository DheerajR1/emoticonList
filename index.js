  const express = require('express');
  const fs = require('fs');

  console.log('This is after the read call');

  var cors = require('cors')
  var app = express()

  app.use(cors())

  app.get("/", (req, res) => {
    res.send(" Go to translate")
  })

  app.get('/getEmoji/emoji.json', (req, res) => {
    console.log(req.query.text)
    var reqEmoji = req.query.text;
    fs.readFile('data.json', (err, data) => {
      if (err) throw err;
      let emojiDB = JSON.parse(data);
      res.json({
        "success": {
          "total": 1
        },
        "contents": {
          "EmojiList": "Testing: fetch of list",
          "emojis": emojiDB[reqEmoji]
        }
      })
    });
  });

  app.get('/getEmojiName/emojiName.json', (req, res) => {
    console.log(req.query.text)
    var emjGroup = req.query.text;
    var emojiName = "not Found";
    fs.readFile('data.json', (err, data) => {
      if (err) throw err;
      let emojiDB = JSON.parse(data);
      console.log("------------------");
      var emojiFound = false;
      Object.entries(emojiDB).every(([key, value]) => {
        if (!emojiFound) {
          Object.entries(value).every(([key1, value1]) => {
            if (emjGroup === value1.emoji) {
              console.log(value1.name);
              emojiName = value1.name;
              emojiFound = true;
              res.json({
                "success": {
                  "total": 1
                },
                "contents": {
                  "EmojiList": "Testing: fetch of list",
                  "emojis": emojiName
                }
              })
              return false;
            } else {
              return true;
            }
          });
          return true;
        } else {
          return false;
        }
      });
    });

  });

  app.get('/getgroup/groupName.json', (req, res) => {
    fs.readFile('data.json', (err, data) => {
      if (err) throw err;
      let emojiDB = JSON.parse(data);
      const emojisGroup = Object.keys(emojiDB);
      console.log({ emojisGroup });
      res.json({
        "success": {
          "total": 1
        },
        "contents": {
          "Data": "Emojis present in DB",
          "text": emojisGroup,
        }
      })
    });
    console.log(req.query.text)

  });

  app.listen(3000, () => {
    console.log('server started');
  });