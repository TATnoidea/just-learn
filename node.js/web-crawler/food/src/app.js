const fs = require('fs');
const request = require('superagent');
const cheerio = require('cheerio');

const baseUrl = 'http://www.dianping.com';

/* orderType详细参数说明
o1: 智能
o2: 人气
o3: 好评
o4: 口味
o5: 环境最佳
o6: 服务最佳
o8: 人均最低
o9: 人均最高
o11: 点评最多
o13: 预定优先
*/
const cityInfo = {
  name: 'shenzhen',
  orderType: 'o4',
}

function sendReq(cityInfo) {
  request
  .get(`${ baseUrl }/${ city }/ch10/o4p1`)
  .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
  .end((err, res) => {
    if(err) throw err;
    console.log(res)
  })
}

sendReq('shenzhen');