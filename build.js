const fs = require('fs');
const path = require('path');

// 简单的 Markdown 解析器 (不需要复杂依赖)
function parseMarkdown(content) {
    const lines = content.split('\n');
    let html = '';
    let metadata = {};
    let isReadingMeta = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 解析 Frontmatter (--- title: ... ---)
        if (line === '---') {
            isReadingMeta = !isReadingMeta;
            continue;
        }
        if (isReadingMeta) {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join(':').trim().replace(/^"|"$/g, '');
                metadata[key] = value;
            }
            continue;
        }
        
        // 简单的 Markdown 转 HTML
        if (line.startsWith('# ')) html += `<h1>${line.substring(2)}</h1>`;
        else if (line.startsWith('## ')) html += `<h2>${line.substring(3)}</h2>`;
        else if (line.startsWith('- ')) html += `<li>${line.substring(2)}</li>`;
        else if (line === '') html += '<br>';
        else html += `<p>${line}</p>`;
    }
    return { metadata, html };
}

function generateLogPage(type, title, color) {
    const dir = path.join(__dirname, 'logs', type);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).reverse(); // 最新在前
    let entriesHtml = '';

    files.forEach(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        const { metadata, html } = parseMarkdown(content);
        
        entriesHtml += `
        <div class="entry">
            <span class="mood">${metadata.mood || '📝'}</span>
            <span class="date">${metadata.date ? metadata.date.split('T')[0] : 'Unknown Date'}</span>
            <h2>${metadata.title || 'Untitled'}</h2>
            <div class="body">${html}</div>
        </div>`;
    });

    const template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Tian Workshop</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fdfdfd; color: #333; line-height: 1.6; margin: 0; padding: 20px; }
        .header { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, ${color}, #a8edea); color: white; border-radius: 20px; margin-bottom: 40px; box-shadow: 0 10px 20px rgba(57, 197, 187, 0.2); }
        .header h1 { margin: 0; font-size: 2.5em; }
        .container { max-width: 800px; margin: 0 auto; }
        .entry { background: white; border: 1px solid #eee; border-radius: 15px; padding: 30px; margin-bottom: 30px; transition: transform 0.2s; }
        .entry:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .date { color: ${color}; font-weight: bold; font-size: 0.9em; margin-bottom: 10px; display: block; }
        .back-btn { display: inline-block; margin-bottom: 20px; color: ${color}; text-decoration: none; font-weight: bold; }
        .mood { font-size: 1.5em; float: right; }
    </style>
</head>
<body>
    <div class="container">
        <a href="../index.html" class="back-btn">← Back to Workshop</a>
        <div class="header"><h1>${title}</h1></div>
        ${entriesHtml}
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, 'logs', `${type}.html`), template);
    console.log(`Generated ${type}.html with ${files.length} entries.`);
}

// 执行构建
console.log('Building Tian Workshop...');
generateLogPage('master', "Master's Log", '#569cd6');
generateLogPage('niangao', "Niangao's Diary", '#39C5BB');
console.log('Build complete! ✨');