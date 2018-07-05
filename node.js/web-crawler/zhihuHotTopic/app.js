const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");

const baseUrl = "https://www.zhihu.com";

function zhihu() {
  request(`${baseUrl}/explore`, (error, response, body) => {
    if (error || !body) {
      return;
    }
    const dailyArr = [];
    const monthlyArr = [];
    const $ = cheerio.load(body);
    const dailyTopic = $(".tab-panel>div[data-type=daily] .feed-item");
    const monthlyTopic = $(".tab-panel>div[data-type=monthly] .feed-item");
    for (let i = 0; i < dailyTopic.length; i++) {
      dailyArr.push(getTopicInfo(dailyTopic.eq(i), i));
    }
    for (let i = 0; i < monthlyTopic.length; i++) {
      monthlyArr.push(getTopicInfo(monthlyTopic.eq(i), i));
    }

    writeFile()
  });
}
// 话题对象
function TOPIC(title, rank, author, agree, summary, url) {
  this.title = title;
  this.rank = rank;
  this.author = author;
  this.agree = agree;
  this.summary = summary;
  this.url = url;
}
// 获取热门话题信息
function getTopicInfo(ele, index) {
  const rank = index + 1;
  const title = ele.find("h2").text();
  const author = ele.find(".author-link").text();
  const agree = ele.find(".count").text();
  let summary = ele.find(".summary").text();
  summary = summary.substring(0, summary.length - 8);
  const url = baseUrl + ele.find(".question_link").attr("href");
  return new TOPIC(title, rank, author, agree, summary, url);
}

zhihu();
