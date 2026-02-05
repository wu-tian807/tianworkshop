// api/callback.js
// 这是一个 Vercel Serverless Function，用来接收 GitHub 回传的 Code 并交换 Token
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const code = req.query.code;
  const { host } = req.headers;

  if (!code) {
    return res.status(400).send('Missing "code" query parameter');
  }

  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return res.status(500).send('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET');
  }

  try {
    // 拿着 Code 去找 GitHub 换 Token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    });

    const result = await response.json();

    if (result.error) {
      return res.status(500).send(`GitHub Error: ${result.error_description}`);
    }

    const token = result.access_token;

    // 拿到 Token 后，存入 localStorage 并关闭
    const content = `
      <!DOCTYPE html>
      <html>
      <body>
      <p>Authentication successful! Saving token...</p>
      <script>
        // 方案 Y: 使用 localStorage 共享 Token
        // 因为 callback 页面和 admin 页面是同源的，所以可以共享！
        localStorage.setItem('netlify-cms-github-oauth-token', '${token}');
        
        // 同时也尝试 postMessage (以此为辅)
        const msg = 'authorization:github:success:${JSON.stringify({
          token: '${token}', 
          provider: 'github'
        })}';
        
        try {
            window.opener.postMessage(msg, '*');
            window.opener.postMessage("authorizing:github", "*");
        } catch(e) {
            console.error(e);
        }

        document.write("<p>Token saved! Closing...</p>");
        
        // 稍微等一下再关，给主窗口一点反应时间
        setTimeout(() => {
            window.close();
        }, 1000);
      </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(content);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};