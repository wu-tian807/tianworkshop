// api/auth.js
// 这是一个 Vercel Serverless Function，用来重定向到 GitHub 授权页面
const { randomBytes } = require('crypto');

module.exports = (req, res) => {
  const { host } = req.headers;
  
  // 生成一个随机状态码防止攻击
  const state = randomBytes(16).toString('hex');
  
  // 获取配置好的 Client ID
  const client_id = process.env.GITHUB_CLIENT_ID;
  
  if (!client_id) {
    return res.status(500).send('Missing GITHUB_CLIENT_ID environment variable');
  }

  // 构建 GitHub 授权链接
  const authorizationUri = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&state=${state}`;

  // 把用户踢到 GitHub 去登录
  res.redirect(authorizationUri);
};