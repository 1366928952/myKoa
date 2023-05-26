const db = require('../db/mySql')
const utils = require('../utils/index')

class HomeController {
  static async Home(ctx, next) {
    ctx.response.body = '<h1>Hello World 哈哈哈</h1>';
  };
  static async Hello(ctx, next) {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
  };
  static async Login(ctx, next) {
    ctx.response.body = `<h1>login</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
  };
  static async Signin(ctx, next) {
    ctx.verifyParams({
      name: {type: 'string', require: true},
      password:{type: 'string', require: true}
    });
    let
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
    let { data } = await db.query(`SELECT password FROM user WHERE name = ?`, name)
    if (data.length === 0) {
      ctx.response.body = `<h1>账号输入有误!</h1>
        <p><a href="/login">Try again</a></p>`;
    } else {
      let flag =  utils.verifyPassword(password, data[0].password)
      if (data.length && flag) {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
      } else {
        ctx.response.body = `<h1>密码错误!</h1>
             <p><a href="/login">Try again</a></p>`;
      }
    }
  };
  static async Save(ctx, next) {
    let { data } = await db.query(`select * from test.students`)
    ctx.response.body = {
      code: 200,
      message: '请求成功',
      data
    };
  };
  static async Register(ctx, next) {
    ctx.response.body = `<h1>Register</h1>
        <form action="/addUser" method="post">
            <p>Name: <input name="name"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
  };
  static async AddUser(ctx){
    ctx.verifyParams({
      name: {type: 'string', require: true},
      password:{type: 'string', require: true}
    });
    let
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
      password = utils.encryptPassword(password)
     let res = await db.query('INSERT INTO user ( name, password ) VALUES (?,?)', [ name, password])
     const { data:{ affectedRows } } = res;
     if(affectedRows){
      ctx.response.body = `<h1>注册成功!</h1>
             <p><a href="/login">go Login</a></p>`;
     }
  }
}

module.exports = HomeController;