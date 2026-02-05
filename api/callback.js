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

    // 拿到 Token 后，把它传回给 Decap CMS
    const content = `
      <!DOCTYPE html>
      <html>
      <body>
      <p>Authentication successful! Closing window...</p>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("callback.js: receiveMessage %o", e);
            
            // 构造消息
            const msg = 'authorization:github:success:${JSON.stringify({
              token: '${token}', 
              provider: 'github'
            })}';
            
            console.log("callback.js: Sending message to opener:", msg);

            // 发送消息给父窗口 (Decap CMS)
            // 尝试所有可能的 origin，因为有时候 origin 会不一样
            window.opener.postMessage(msg, e.origin);
            window.opener.postMessage(msg, '*'); // 暴力全发！
          }

          window.addEventListener("message", receiveMessage, false);
          
          console.log("callback.js: Sending handshake...");
          // 触发握手
          window.opener.postMessage("authorizing:github", "*");
        })()
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