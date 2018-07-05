const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");

const baseUrl = "https://www.zhihu.com";

function _main() {
  request(`${baseUrl}/explore`, (error, response, body) => {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body);
    // 获取相关元素
    const dailyTopic = $(".tab-panel>div[data-type=daily] .feed-item");
    const monthlyTopic = $(".tab-panel>div[data-type=monthly] .feed-item");
    // 获取标题数组
    const dailyArr = getTopics(dailyTopic);
    const monthlyArr = getTopics(monthlyTopic);

    // 创建单个保存的对象
    const time = moment().format("YYYY-MM-DD HH:MM");
    const dailyRecord = new RECORD(time, dailyArr);
    const monthlyRecord = new RECORD(time, monthlyArr);

    // 保存文件路径
    const dailyFileUrl = path.resolve(__dirname, "./dailyTopic.json");
    const monthlyFileUrl = path.resolve(__dirname, "./monthlyTopic.json");
    writeFile(dailyFileUrl, dailyRecord);
    writeFile(monthlyFileUrl, monthlyRecord);
  });
}

// 存储话题对象
function RECORD(time, topics) {
  this.time = time; // 日期
  this.topics = topics; // 话题数
}
// 单个话题对象
function getTopicInfo(ele, index, time) {
  const topic = {};
  topic.rank = index + 1; // 排名
  topic.title = ele
    .find("h2")
    .text()
    .trim(); // 标题
  topic.author = ele.find(".author-link").text(); // 作者
  topic.agree = ele.find(".count").text(); // 赞数
  let summary = ele.find(".summary").text(); // 简介
  topic.summary = summary.substring(0, summary.length - 8).trim();
  topic.url = baseUrl + ele.find(".question_link").attr("href"); // 链接
  return topic;
}

// 遍历获取单个信息
function getTopics(ele) {
  const arr = [];
  const eleArr = Array.from(ele);
  eleArr.forEach((item, index) => {
    arr.push(getTopicInfo(ele.eq(index), index));
  });
  return arr;
}

// 写入文件
function writeFile(url, data) {
  const fileUrl = url;
  const appendData = data;
  if (fileExist(fileUrl)) {
    fs.readFile(fileUrl, "utf-8", (err, data) => {
      let oldData = JSON.parse(data);
      oldData.push(appendData);
      const newData = JSON.stringify(oldData);
      fs.writeFile(fileUrl, newData, err => {
        if (err) throw err;
      });
    });
  } else {
  }
}

// 判断文件是否存在
function fileExist(url) {
  fs.access(url, fs.constants.F_OK, err => {
    return false;
  });
  return true;
}

_main();
