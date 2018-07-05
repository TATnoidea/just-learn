const fs = require("fs"); // fs模块
const path = require("path"); // path模块
const request = require("request"); // 通过request发送请求
const cheerio = require("cheerio"); // 通过cheerio来获取DOM
const moment = require("moment"); // 格式化时间
const schedule = require("node-schedule");

const baseUrl = "https://www.zhihu.com"; // 基本链接

// 获取话题的主要函数
function getTopic(type, time) {
  request(`${baseUrl}/explore`, (error, response, body) => {
    if (error || !body) return;
    const $ = cheerio.load(body);
    const time =  moment().format("YYYY-MM-DD HH:MM"); // 时间
    const topic = $(`.tab-panel>div[data-type=${ type }] .feed-item`);  // 相关元素
    const arr = getTopics(topic); // 话题数组
    const record = new RECORD(time, arr); // 单个记录
    const fileUrl = path.resolve(__dirname, `./${ type }_topic.json`); // 文件路径

    writeFile(fileUrl, record);
  })
    
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
  topic.summary = summary.substring(0, summary.length - 8).trim(); // 因为简介后面有显示全文所以需要删除掉
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
  const fileUrl = url; // 文件地址
  const appendData = data; // 需要添加的数据
  // 判断文件是否存在
  if (fs.existsSync(fileUrl)) {
    // 文件存在
    fs.readFile(fileUrl, "utf-8", (err, data) => {
      const oldData = JSON.parse(data); // 旧的数据
      oldData.push(appendData); // 将新添加的数据push进旧的数据中
      const newData = JSON.stringify(oldData); // 将对象字符串化
      // 写入文件
      fs.writeFile(fileUrl, newData, err => {
        if (err) throw err;
      });
    });
  } else {
    // 文件不存在
    const data = JSON.stringify([appendData]);
    // writeFile中的flag设为w+时，不存在文件会创建文件
    fs.writeFile(fileUrl, data, { flag: "w+" }, err => {
      if (err) throw err;
    });
  }
}
// 每天定时获取
function scheduleTask() {
  // 每小时获取一次每日最热话题
  schedule.scheduleJob("0 15 * * * *", () => {
    getTopic('daily');
  });
  // 每天获取一次每月最热话题
  schedule.scheduleJob("0 15 20 * * *", () => {
    getTopic('monthly');
  });
}

scheduleTask();
