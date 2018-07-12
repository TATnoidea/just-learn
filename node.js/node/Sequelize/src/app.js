const Sequelize = require("sequelize");
const config = require("./mysql.config");

const sequelize = new Sequelize(
  config.database,  // 数据库名
  config.username,  // 用户名
  config.password,  // 密码
  {
    host: config.host,  // 主机地址
    port: 3306, // 端口
    dialect: "mysql", // 数据库类型：'mysql', 'sqlite', 'postgres', 'mssql
    operatorsAliases: false,  // 运算符别名，没有别名可以提高sequelize的安全性
    timestamps: false,
    // define: {
    //   freezeTableName: true // 是否修改表名为复数
    // },
    pool: {
      max: 5, // 不要超过5个开放的链接
      min: 0, // 最小链接数
      acquire: 30000, // 抛出错误之前最长获取链接的时间
      idle: 10000 // 在链接未使用多少时间后断开链接
    },
  }
);

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch(() => {
  console.log('Unable to connect to the database:', err);
});

// user model
const User = sequelize.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

// // force为true的话，如果存在user表会先删除users表
// User.sync({ force: true }).then(() => {
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

// query
User.findAll().then(users => {
  console.log(users);
});
