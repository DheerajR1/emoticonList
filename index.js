const express = require('express');
const fs = require('fs');
const fsExtra = require('fs-extra');

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

function getEmojiName(inputEmoji) {

  var emojiName = "not Found";
  const data = fsExtra.readFileSync('data.json');
  let emojiDB = JSON.parse(data);
  var emojiFound = false;
  Object.entries(emojiDB).every(([key, value]) => {
    if (!emojiFound) {
      console.log(key);
      Object.entries(value).every(([key1, value1]) => {
        if (inputEmoji === value1.emoji) {
          console.log(value1.name);
          emojiName = value1.name;
          emojiFound = true;
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

  return emojiName;
}

app.get('/getEmojiName/emojiName.json', (req, res) => {
  console.log(req.query.text)
  var emojiSent = req.query.text;

  console.log(getEmojiName(emojiSent));
  res.json({
    "success": {
      "total": 1
    },
    "contents": {
      "ServiceDetail": "Fetch emoji name",
      "emojiName": getEmojiName(emojiSent)
    }
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