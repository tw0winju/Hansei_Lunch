const express = require('express');
const app = express();
const request = require('request');

app.get('/', (req, res) => {          // 학교 급식 정보 가져오는 미들웨어
  
  const month = new Date();
  const url = "https://schoolmenukr.ml/api/high/B100000662"+ "?hideAllergy=true"+'&month='+ month.setMonth() ;  // 학교 급식 api 요청 주소
  
  request(url, (err, response, body) => {
  
    if(err) {
      console.error(err);
    }

    else {
      console.log("한세 급식 데이터 가져오기 성공!");
    }

    const data = JSON.parse(body);        // body로 받은 데이터를 json형식으로 파싱해서 data 변수에 저장
    const lunch = [];
    const date = [];
    const day = ["월","화","수","목","금","토","일"];
    
    for(let i = 0; i < data.menu.length; i++) {         // 급식 데이터를 반복문써서 배열에 넣음
      lunch.push(data.menu[i].lunch); 
      date.push(data.menu[i].date);
    }

    res.render('lunch.ejs', {           // 페이지 렌더링
      lunch: lunch,
      date: date,
      menu: data.menu,
      day: day
    });

  });

});

module.exports = app;