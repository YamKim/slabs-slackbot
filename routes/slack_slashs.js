require('dotenv').config();
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

const useApi42 = require('../libs/useApi42');

router.post('/', async (req, res, next) => {
  const body = req.body;
  const channelId = body.channel_id;

  const userData = await useApi42.run(res, body.text);

  let result;
  // add other APIs and 
  const slackCmd = await useApi42.getCommand(cmdKey);
  if (typeof slackCmd === 'function') {
    result = await slackCmd(userData, channelId);
    res.sendStatus(200, '');
  } else {
    result = '🤖Hmm... but don’t panic!';
    res.sendStatus(200, 'Error: slash command error.');
  }
});

module.exports = router;