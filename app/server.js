const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const { sendMail } = require('./nodemailer');

const subscribeList = [
  'The Irregular Of The Royal Academy Of Magic ~The Strongest Sorcerer From The Slums Is Unrivaled In The School Of Royals ~',
  'Martial Peak'
];

cron.schedule('*/10 * * * *', async () => {
  let updateFound = false;
  const { data } = await axios.get('https://manganato.com');
  const $ = cheerio.load(data);
  $('div[class="panel-content-homepage"]')
    .find('div > div > h3')
    .toArray()
    .map((item) => {
      let title = $(item).text().split('\n').join('');
      if (subscribeList.includes(title)) updateFound = true;
      return title;
    });

  if (updateFound) {
    updateFound = false;
    const message = `
      <h3>There is a new update!</h3>
    `;
    sendMail('mrandi96@gmail.com', 'Manga Notification', message);
  }
});
