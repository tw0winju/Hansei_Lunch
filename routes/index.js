const express = require('express');
const app = express();
const request = require('request');

app.get('/', (req, res) => {
  
  const month = new Date();
  const url = "https://schoolmenukr.ml/api/high/B100000662"+ "?hideAllergy=true"+'&month='+ month.setMonth() ;
  request(url, (err, response, body) => {
    if(err) {
      console.log(err)
    }
    const data = JSON.parse(body);
    const lunch = [];
    const date = [];
    for(let i = 0; i < data.menu.length; i++) {
      lunch.push(data.menu[i].lunch);
      date.push(data.menu[i].date);
    }
    res.render('lunch.ejs', {
      lunch: lunch,
      date: date,
      menu: data.menu
    });
  });
  });

module.exports = app;