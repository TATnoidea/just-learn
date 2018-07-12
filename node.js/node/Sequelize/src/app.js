const Sequelize = require("sequelize");
const config = require("./mysql.config");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch(() => {
  console.log('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

// force为true的话，如果存在user表会先删除user表
User.sync({ force: true }).then(() => {
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

