const bcrypt = require('bcrypt') 

// 同步方式加密密码
function encryptPassword(password) {
    // 生成salt的迭代次数：默认值是10，推荐值12
    const saltRounds =  10
    // 随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds)
    // 获取hash值
    return bcrypt.hashSync(password, salt)
  }

 // 同步方式验证密码
function verifyPassword(password1, password2){
  return bcrypt.compareSync(password1, password2)
}

module.exports = {
    encryptPassword,
    verifyPassword,
  }